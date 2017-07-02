$(document).ready(function () {
    var SEP = '|';
    //window.onbeforeunload = function(){
    //       //return ('Текст уведомления');
    //}
    //localStorage.clear();

    var dataForm = $('form.general-settings').serializeArray();
    var project = $('#project_id').val();
    var ITEM = "forecast|" + project;

      
    $.each(dataForm, function (key, value) {
        var name = value.name;
        if (localStorage[ITEM + SEP + name]) {
            $('[name=' + value.name + ']').val(localStorage[ITEM + SEP + name]);

        } else {
            localStorage.setItem(ITEM + SEP + name, value.value);
        }
    });
    $("a[id^='mfs']").
    fancybox({
		'titleShow'     : false
	});
});

function decimalAdjust(type, value, exp) {
    // Если степень не определена, либо равна нулю...
    if (typeof exp === 'undefined' || +exp === 0) {
        return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // Если значение не является числом, либо степень не является целым числом...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
        return NaN;
    }
    // Сдвиг разрядов
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Обратный сдвиг
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
}

function reloadJS() {
    $('.calculator #loading').show();
    var SEP = '|';
    $("form.general-settings input,form.general-settings select").bind("keyup change", function (e) {
        var dataForm = $(this).parents('form').serializeArray();
        $.ajax({
            type: 'POST',
            data: dataForm,
            url: '/generalsettings',
            error: function (xhr, str) {
                alert('Возникла ошибка: ' + xhr.responseCode);
            }
        });
    });

    //$('#tabs ul li').click(function(){
    //    var href = $(this).find('a').attr('href');
    //    $.ajax({
    //        url: '',
    //        success: function (data) {
    //            $(href).empty();
    //            $(href).html($(data).find(href).html());
    //            $(href).resize();
    //            reloadJS();
    //        },
    //        error: function (xhr, str) {
    //            alert('Возникла ошибка: ' + xhr.responseCode);
    //        }
    //    });
    //});
    $("input").bind("keyup", function (e) {

        var dataForm = $(this).parents('form').serializeArray();
        var type = $(this).data('type');
        var key = $(this).data('key');
        var product_num = $(this).data('product_num');
        var period_number = $('[name=period_number]').val();
        var direct_material_num = $(this).data('direct_material_num');
        var this_val = $(this).val();
        var result = 0;
        var i = 0;
        var product = '';
        $.each(dataForm, function (key, value) {
            if (value.name == 'product_num' || product_num) {
                product = 'product-' + product_num;
            }
        });

        var project = $('#project_id').val();
        var ITEM = "forecast|" + project;
        if (product) {
            ITEM += SEP + product;
        }
        var name = $(this).attr('name');
        localStorage.setItem(ITEM + SEP + name, $(this).val());
        var elemIDbegin = false;
        if (type == 'work_in_process_ending') {
            elemIDbegin = '#work_in_process_beginning_' + (key + 1) + '_' + $(this).data('product_num');
            $(elemIDbegin).val($(this).val());
            name = $(elemIDbegin).attr('name');
            localStorage.setItem(ITEM + SEP + name, $(this).val());
        }

        if (type == 'raw_material_ending') {
            elemIDbegin = '#raw_material_beginning_' + (key + 1) + '_' + direct_material_num + '_' + $(this).data('product_num');
            $(elemIDbegin).val($(this).val());
            name = $(elemIDbegin).attr('name');
            localStorage.setItem(ITEM + SEP + name, $(this).val());

            totalCalculate($(this), 'total_direct_materials_beginning', project, ITEM, (key + 1), product_num);
            totalCalculate($(this), 'total_direct_materials_ending', project, ITEM, key, product_num);
        }

        if (type == 'raw_material_beginning') {
            var total = 0;
            $(this).parents('.tabs-materials').find('.raw_material_beginning').each(function () {
                if ($(this).data('key') == key && $(this).data('product_num') == product_num) {
                    total = total + Number($(this).val());
                }
            });
            var item = $('#total_direct_materials_beginning_' + key + '_' + product_num);
            item.val(total);
            localStorage.setItem(ITEM + SEP + 'direct_materials|total_direct_materials_beginning|' + key, total);

        }

        if (type == 'finished_goods_manufactured' || type == 'finished_goods_sold' || type == 'finished_goods_beginning') {
            calculate($(this), 'finished_goods_ending', project, ITEM, key, product_num);
            totalCalculate(false, 'total_units_manufactured', project, ITEM,key);
            totalCalculate(false, 'total_units_sold', project, ITEM,key);
        }

        if (type == 'total_raw_material_purchased' || type == 'purchasing_price_per_unit') {
            calculate($(this), 'raw_material_purchased', project, ITEM, false, product_num, direct_material_num);
        }
        if (type == 'vat') {
            for (i = 1; i <= period_number; i++) {
                $('#vat_' + i + '_' + product_num).val(this_val);
                localStorage.setItem(ITEM + SEP + 'vat' + SEP + i, this_val);

                // Current Sale Price (VAT incl)
                var current_sale_price = Number($('#current_sale_price_' + i + '_' + product_num).val());
                if (current_sale_price){
                    var vat_incl = current_sale_price*(1+this_val/100);
                    $('#vat_incl_' + i + '_' + product_num).val(vat_incl);
                    localStorage.setItem(ITEM + SEP +'vat_incl'+ SEP+ i, vat_incl);
                }
            }
        }

        if (type == 'cogm_mark_up') {

            var cogm = Number($('#cogm_' + key + '_' + product_num).val());
            if (cogm){
                // Current Sale Price
                var current_sale_price = cogm*(1+this_val/100);
                current_sale_price = decimalAdjust('round', current_sale_price, '-3');
                $('#current_sale_price_' + key + '_' + product_num).val(current_sale_price);
                localStorage.setItem(ITEM + SEP +'current_sale_price'+ SEP+ key, current_sale_price);

                //Product revenue
                var finished_goods_sold = $('#finished_goods_sold_' + key + '_' + product_num).val();
                var product_revenue = current_sale_price*finished_goods_sold;
                $('#product_revenue_' + key + '_' + product_num).val(product_revenue);
                localStorage.setItem(ITEM + SEP +'product_revenue'+ SEP+ key, product_revenue);

                //NeNet Target Income unit
                var net_target_income_unit = Number(current_sale_price)-Number(cogm);
                net_target_income_unit = decimalAdjust('round', net_target_income_unit, '-3');
                $('#net_target_income_unit_' + key + '_' + product_num).val(net_target_income_unit);
                localStorage.setItem(ITEM + SEP +'net_target_income_unit'+ SEP+ key, net_target_income_unit);
                
                //Net Target Income batch
                var total_cost_of_batch = Number($('#total_cost_of_batch_' + key + '_' + product_num).val());
                var net_target_income_batch = Number(product_revenue)-Number(total_cost_of_batch);
                net_target_income_batch = decimalAdjust('round', net_target_income_batch, '-3');
                $('#net_target_income_batch_' + key + '_' + product_num).val(net_target_income_batch);
                localStorage.setItem(ITEM + SEP +'net_target_income_batch'+ SEP+ key, net_target_income_batch);

                //Contribution margin unit
                var  variable_cost_unit = Number($('#variable_cost_unit_' + key + '_' + product_num).val());
                var contribution_margin_unit = Number(current_sale_price) - variable_cost_unit;
                contribution_margin_unit = decimalAdjust('round', contribution_margin_unit, '-3');
                $('#contribution_margin_unit_' + key + '_' + product_num).val(contribution_margin_unit);
                localStorage.setItem(ITEM + SEP +'contribution_margin_unit'+ SEP+ key, contribution_margin_unit);

                //Contribution margin batch
                var  variable_cost_batch = Number($('#variable_cost_batch_' + key + '_' + product_num).val());
                var contribution_margin_batch = Number(product_revenue) - Number(variable_cost_batch);
                contribution_margin_batch = decimalAdjust('round', contribution_margin_batch, '-3');
                $('#contribution_margin_batch_' + key + '_' + product_num).val(contribution_margin_batch);
                localStorage.setItem(ITEM + SEP +'contribution_margin_batch'+ SEP+ key, contribution_margin_batch);

                //Contribution margin ratio
                var contribution_margin_ratio = Number(contribution_margin_unit) / Number(current_sale_price)*100;
                contribution_margin_ratio = decimalAdjust('round', contribution_margin_ratio, '0');
                $('#contribution_margin_ratio_' + key + '_' + product_num).val(contribution_margin_ratio);
                localStorage.setItem(ITEM + SEP +'contribution_margin_ratio'+ SEP+ key, contribution_margin_ratio);

                //Return on sales batch
                var return_on_sales_batch = Number(net_target_income_batch) / Number(product_revenue)*100;
                return_on_sales_batch = decimalAdjust('round', return_on_sales_batch, '0');
                $('#return_on_sales_batch_' + key + '_' + product_num).val(return_on_sales_batch);
                localStorage.setItem(ITEM + SEP +'return_on_sales_batch'+ SEP+ key, return_on_sales_batch);

                //Breake-Even point units
                var fixed_cost_batch = $('#fixed_cost_batch_' + key + '_' + product_num).val();
                var breake_even_point_units = Number(fixed_cost_batch) / Number(contribution_margin_unit);
                breake_even_point_units = decimalAdjust('round', breake_even_point_units, '-3');
                $('#breake_even_point_units_' + key + '_' + product_num).val(breake_even_point_units);
                localStorage.setItem(ITEM + SEP +'breake_even_point_units'+ SEP+ key, breake_even_point_units);

                //Breake-Even point $
                var breake_even_point = Number(breake_even_point_units) * Number(current_sale_price);
                breake_even_point = decimalAdjust('round', breake_even_point, '-3');
                $('#breake_even_point_' + key + '_' + product_num).val(breake_even_point);
                localStorage.setItem(ITEM + SEP +'breake_even_point'+ SEP+ key, breake_even_point);

                //Margin of safety batch $
                var margin_of_safety_batch_ye = Number(product_revenue) - Number(breake_even_point);
                margin_of_safety_batch_ye = decimalAdjust('round', margin_of_safety_batch_ye, '-3');
                $('#margin_of_safety_batch_ye_' + key + '_' + product_num).val(margin_of_safety_batch_ye);
                localStorage.setItem(ITEM + SEP +'margin_of_safety_batch_ye'+ SEP+ key, margin_of_safety_batch_ye);

                //Margin of safety batch %
                var margin_of_safety_batch_perc = Number(margin_of_safety_batch_ye) / Number(product_revenue)*100;
                margin_of_safety_batch_perc = decimalAdjust('round', margin_of_safety_batch_perc, '0');
                $('#margin_of_safety_batch_perc_' + key + '_' + product_num).val(margin_of_safety_batch_perc);
                localStorage.setItem(ITEM + SEP +'margin_of_safety_batch_perc'+ SEP+ key, margin_of_safety_batch_perc);

                //DOL
                var dol = Number(contribution_margin_batch) / Number(net_target_income_batch);
                dol = decimalAdjust('round', dol, '-3');
                $('#dol_' + key + '_' + product_num).val(dol);
                localStorage.setItem(ITEM + SEP +'dol'+ SEP+ key, dol);

            }
            for (i = 1; i <= period_number; i++) {
                //Revenue
                total = 0;
                $.each(localStorage, function (key, value) {
                    if (key.indexOf('product_revenue')+1) {
                        var arr = key.split('|');
                        if (arr[4] == i){
                            total += value;
                        }
                    }
                });
                this_val = decimalAdjust('round', total, '-3');
                $('#revenue-' + i).val(this_val);
                localStorage.setItem(ITEM + SEP +'revenue'+ SEP+ i, this_val);

                //Sales mix ratio
                $.each(localStorage, function (key1, value) {
                    if (key1.indexOf('product_revenue')+1) {
                        var arr = key1.split('|');
                        if (arr[4] == i){
                            var prodNum = arr[2].substr(8);
                            var sales_mix_ratio = value/this_val*100;
                            $('#sales_mix_ratio_' + i + '_' + prodNum).val(sales_mix_ratio);
                            localStorage.setItem(ITEM + SEP +'sales_mix_ratio'+ SEP+ i, sales_mix_ratio);

                            //Weighted average contribution margin unit
                           var contribution_margin_unit = $('#contribution_margin_unit_' + i + '_' + prodNum).val();
                            var weighted_average_contribution_margin_unit = ($('#weighted_average_contribution_margin_unit-' + i).val())?($('#weighted_average_contribution_margin_unit-' + i).val()):0;
                            weighted_average_contribution_margin_unit = Number(weighted_average_contribution_margin_unit) + Number(contribution_margin_unit*sales_mix_ratio/100);
                            weighted_average_contribution_margin_unit = decimalAdjust('round', weighted_average_contribution_margin_unit, '-3');
                            $('#weighted_average_contribution_margin_unit-' + i).val(weighted_average_contribution_margin_unit);
                            localStorage.setItem(ITEM + SEP +'weighted_average_contribution_margin_unit'+ SEP+ i, weighted_average_contribution_margin_unit);

                            //Weighted average contribution margin ratio
                           var contribution_margin_ratio = $('#contribution_margin_ratio_' + i + '_' + prodNum).val();
                            var weighted_average_contribution_margin_ratio = ($('#weighted_average_contribution_margin_ratio-' + i).val())?($('#weighted_average_contribution_margin_ratio-' + i).val()):0;
                            console.log(weighted_average_contribution_margin_ratio);
                            console.log(contribution_margin_ratio);
                            console.log(sales_mix_ratio);
                            weighted_average_contribution_margin_ratio = Number(weighted_average_contribution_margin_ratio) + Number(contribution_margin_ratio*sales_mix_ratio/100);
                            weighted_average_contribution_margin_ratio = decimalAdjust('round', weighted_average_contribution_margin_ratio, '-3');
                            $('#weighted_average_contribution_margin_ratio-' + i).val(weighted_average_contribution_margin_ratio);
                            localStorage.setItem(ITEM + SEP +'weighted_average_contribution_margin_ratio'+ SEP+ i, weighted_average_contribution_margin_ratio);
                        }
                    }
                });




            }
        }

        if (type == 'season_price_change_rate_perc') {
            calculate($(this), 'season_price_change_rate_val', project, ITEM, key, product_num, direct_material_num);
        }

        if (type == 'season_price_change_rate_perc') {
            calculate($(this), 'season_price_change_rate_val', project, ITEM, key, product_num, direct_material_num);
        }

        if (type == 'ammount_per_product') {
            totalCalculate($(this).parents('.tabs-materials'), 'batch_expences', project, ITEM, false, product_num);
        }

        if (type == 'manual_hours_required') {
            var key_direct_labor = ITEM + SEP + 'direct_labor' + SEP + direct_material_num + SEP + 'manual_hours_required' + SEP;
            for (i = 1; i <= period_number; i++) {
                $('#manual_hours_required_' + i + '_' + direct_material_num + '_' + product_num).val(this_val);
                localStorage.setItem(key_direct_labor + i, this_val);
            }
        }

        if (type == 'monthly_payment') {
            calculate($(this), 'total_additional_materials', project, ITEM);
        }

        if (type == 'support_administrative_monthly_ammount' || type == 'support_administrative_payroll_taxes' || type == 'support_administrative_annual_growth_rate'
            || type == 'indirect_labor_monthly_ammount' || type == 'indirect_labor_payroll_taxes' || type == 'indirect_labor_annual_growth_rate') {
            calculate($(this), 'total_additional_materials', project, ITEM);
        }

        if (type == 'manual_hours_required' || type == 'price_per_hour' || type == 'payroll_taxes' || type == 'annual_growth_rate') {
            var key_direct_labor = ITEM + SEP + 'direct_labor' + SEP + direct_material_num + SEP;

            for (i = 1; i <= period_number; i++) {
                if (i == 1) {
                    $('#' + type + '_' + i + '_' + direct_material_num + '_' + product_num).val(this_val);
                    localStorage.setItem(key_direct_labor + type + SEP + i, this_val);

                    var price_per_hour = $('#price_per_hour_' + direct_material_num + '_' + product_num).val();
                    var payroll_taxes = $('#payroll_taxes_' + direct_material_num + '_' + product_num).val();
                    var manual_hours_required = $('#manual_hours_required_' + direct_material_num + '_' + product_num).val();
                    var finished_goods_manufactured = $('#finished_goods_manufactured_' + i + '_' + product_num).val();
                    if (price_per_hour && payroll_taxes && manual_hours_required && finished_goods_manufactured) {
                        result = ((manual_hours_required * price_per_hour) + Number(payroll_taxes)) * finished_goods_manufactured;
                        this_val = decimalAdjust('round', result, '-3');
                        $('#worker_' + i + '_' + direct_material_num + '_' + product_num).val(this_val);
                        localStorage.setItem(key_direct_labor + 'worker' + SEP + i, this_val);
                    }
                } else {
                    var prev_price_per_hour = $('#price_per_hour_' + (i - 1) + '_' + direct_material_num + '_' + product_num).val();
                    var prev_payroll_taxes = $('#payroll_taxes_' + (i - 1) + '_' + direct_material_num + '_' + product_num).val();
                    var prev_manual_hours_required = $('#manual_hours_required_' + (i - 1) + '_' + direct_material_num + '_' + product_num).val();
                    var finished_goods_manufactured = $('#finished_goods_manufactured_' + i + '_' + product_num).val();

                    var annual_growth_rate = $('#annual_growth_rate_' + direct_material_num + '_' + product_num).val();

                    if (annual_growth_rate && prev_price_per_hour) {
                        result = prev_price_per_hour * (1 + (annual_growth_rate / 100 / 12));
                        this_val = decimalAdjust('round', result, '-3');
                        $('#price_per_hour_' + i + '_' + direct_material_num + '_' + product_num).val(this_val);
                        localStorage.setItem(key_direct_labor + 'price_per_hour' + SEP + i, this_val);
                    }
                    if (annual_growth_rate && prev_payroll_taxes) {
                        result = prev_payroll_taxes * (1 + (annual_growth_rate / 100 / 12));
                        this_val = decimalAdjust('round', result, '-3');
                        $('#payroll_taxes_' + i + '_' + direct_material_num + '_' + product_num).val(this_val);
                        localStorage.setItem(key_direct_labor + 'payroll_taxes' + SEP + i, this_val);
                    }
                    if (prev_price_per_hour && prev_payroll_taxes && prev_manual_hours_required && finished_goods_manufactured) {
                        result = ((prev_manual_hours_required * prev_price_per_hour) + Number(prev_payroll_taxes)) * finished_goods_manufactured;
                        this_val = decimalAdjust('round', result, '-3');
                        $('#worker_' + i + '_' + direct_material_num + '_' + product_num).val(this_val);
                        localStorage.setItem(key_direct_labor + 'worker' + SEP + i, this_val);
                    }
                }
            }
            totalCalculate($(this).parents('.tabs-materials'), 'prod_direct_labor', project, ITEM, false, product_num);
            totalCalculate($(this).parents('.tabs-materials'), 'prod_prime_cost', project, ITEM, false, product_num);
        }

        var key_direct_materials = ITEM + SEP + 'direct_materials' + SEP;

        for (i = 1; i <= period_number; i++) {
            var total_direct_materials_purchased = key_direct_materials + 'total_direct_materials_purchased' + SEP + i;
            var total_direct_materials_beginning = key_direct_materials + 'total_direct_materials_beginning' + SEP + i;
            var total_direct_materials_ending = key_direct_materials + 'total_direct_materials_ending' + SEP + i;
            var batch_expences = key_direct_materials + 'batch_expences' + SEP + i;
            //total_direct_materials_1_1
            if (localStorage[total_direct_materials_purchased] && localStorage[total_direct_materials_beginning] && localStorage[total_direct_materials_ending] && localStorage[batch_expences]) {
                result = Number(localStorage[total_direct_materials_purchased])
                    + Number(localStorage[total_direct_materials_beginning])
                    + Number(localStorage[batch_expences])
                    - Number(localStorage[total_direct_materials_ending]);
                $('#prod_direct_materials_' + i + '_' + product_num).val(result);
                localStorage.setItem(key_direct_materials + 'prod_direct_materials|' + i, result);
            }
        }

        console.log(localStorage);

    });

    $(function () {
        $("#tabs").tabs();
        $("#main-tabs").tabs();
        $(".tabs-materials").tabs();
    });

    $('.show-hide-all-product').on('click', function () {
        $(".add-products-block .product").each(function (index, element) {
            if ($(element).find('section').is(':visible')) {
                $(element).find('.show-hide-product').click();
            }
        });
        return false;
    });


    var first = true;
    $('.input-data').keyup(function (e) {
        var elem = $(this);
        if (elem.val()) {
            elem.removeClass('errorInput');
        } else {
            if (!first) {
                elem.addClass('errorInput');
                first = true;
            } else {
                first = false;
            }
        }
    });
    $('.calculator #loading').hide();
}

$(document).ready(function () {
    var SEP = '|';
    reloadJS();
    $('#back-top').backTop({
        'position': 400,
        'speed': 500
    });
    $('.general-settings input').keyup(function () {
        var idObj = $(this).data('name-input');
        $('#' + idObj).val($(this).val())
    });
    $('.general-settings select').on('change', function () {
        var idObj = $(this).data('name-input');
        $('#' + idObj).val($(this).val())
    });

    $('.add-product').on('click', function () {
        var product_num = $('#product_num').val();

        $.ajax({
            type: 'POST',
            data: {
                month_to_begin: $('[name=month_to_begin]').val(),
                period_number: $('[name=period_number]').val(),
                product_num: product_num,

            },
            url: '/addproduct',
            success: function (data) {
                $('.add-products-block').append(data);
                $('#product_num').val(Number(product_num) + 1);
                var project = $('#project_id').val();
                var ITEM = "forecast|" + project;
                ITEM += SEP + 'productId';

                localStorage.setItem(ITEM, product_num);
                var number_prod = 0;
                $.each(localStorage, function (key, value) {
                    if (key.indexOf('forecast|project-1|product') == '0') {
                        number_prod++;
                    }
                });
                $('#number_prod').val(number_prod);

                reloadJS();
            },
            error: function (xhr, str) {
                alert('Возникла ошибка: ' + xhr.responseCode);
            }
        });

        $.ajax({
            type: 'POST',
            data: {
                month_to_begin: $('[name=month_to_begin]').val(),
                period_number: $('[name=period_number]').val(),
                product_num: product_num,
            },
            url: '/addproductmarkup',
            success: function (data) {
                $('.add-products-block-mark-up').append(data);
                reloadJS();
            },
            error: function (xhr, str) {
                alert('Возникла ошибка: ' + xhr.responseCode);
            }
        });
        return false;
    });

    $('.a-login').click(function(){
        $('.log-pop').toggle();
    });
});

function deleteProduct(el) {
    var elem = $(el);
    $("#dialog-confirm").html("Are you sure you want to remove this product?");
    $("#dialog-confirm").dialog({
        resizable: false,
        modal: true,
        title: "Confirmation dialog box",
        height: 200,
        width: 300,
        buttons: {
            "Yes": function () {


                $(this).dialog('close');
                var product_num = elem.data('product_num');
                var project = $('#project_id').val();
                var ITEM = "forecast|" + project;
                ITEM += "|product-" + product_num;

                $.each(localStorage, function (key, value) {
                    if (key.indexOf(ITEM) == 0) {
                        localStorage.removeItem(key);
                    }
                });

                $.ajax({
                    type: 'POST',
                    data: {product_num: product_num},
                    url: '/delproduct',
                    success: function () {
                        var elRemove = elem.parent('.product');
                        elRemove.animate({opacity: 0, height: 0}, 500, function () {
                            elRemove.remove();
                            $('#product-'+product_num+'-mark-up').remove();
                        });
                    },
                    error: function (xhr, str) {
                        alert('Возникла ошибка: ' + xhr.responseCode);
                    }
                });
            },
            "No": function () {
                $(this).dialog('close');
            }
        }
    });
}

function saveProduct(el) {

    var dataForm = $(el).parents('form').serializeArray();
    var project = $('#project_id').val();
    var user = $('#user_id').val();
    localStorage.clear();
    //$.each(dataForm, function (key, value) {
    //    localStorage.setItem("forecast." + user + '.' + project + '.' + value.name, value.value);
    //});
    //
    //console.log(localStorage['calculation.user-11.project-11.finished_goods_manufactured[1]']);
    //$.ajax({
    //    type: 'POST',
    //    data: dataForm,
    //    url: '/setsession',
    //    success: function () {
    //        $('#message-block').text('Data saved successfully').show().delay( 1000 ).fadeOut( 1000 );
    //    },
    //});
    return false;
}

function deleteDirectMaterial(el) {
    var elem = $(el);
    $("#dialog-confirm").html("Are you sure you want to remove this material?");
    $("#dialog-confirm").dialog({
        resizable: false,
        modal: true,
        title: "Confirmation dialog box",
        height: 200,
        width: 300,
        buttons: {
            "Yes": function () {
                $(this).dialog('close');


                var product_num = elem.data('product_num');
                var direct_material_num = elem.data('direct_material_num');
                var name = elem.data('name');
                var type = $(this).data('type');
                var key = $(this).data('key');

                var product = 'product-' + product_num;

                var project = $('#project_id').val();
                var ITEM = "forecast|" + project;
                if (product) {
                    ITEM += '|' + product;
                }
                var tabs = elem.parents('.tabs-materials');
                elem.parent('.direct-material').remove();

                totalCalculate(tabs, 'total_direct_materials_beginning', project, ITEM, false, product_num);
                totalCalculate(tabs, 'total_direct_materials_ending', project, ITEM, false, product_num);
                totalCalculate(tabs, 'total_direct_materials_purchased', project, ITEM, 1, product_num);

                ITEM += "|" + name;
                ITEM += "|" + direct_material_num;
                console.log(ITEM);
                $.each(localStorage, function (key, value) {
                    if (key.indexOf(ITEM) == 0) {
                        localStorage.removeItem(key);
                    }
                });

                $.ajax({
                    type: 'POST',
                    data: {product_num: product_num, direct_material_num: direct_material_num},
                    url: '/deldirectmaterial',
                    success: function (data) {

                    },
                    error: function (xhr, str) {
                        alert('Возникла ошибка: ' + xhr.responseCode);
                    }
                });
            },
            "No": function () {
                $(this).dialog('close');
            }
        }
    });
}
function deleteMaterial(el) {
    var elem = $(el);
    $("#dialog-confirm").html("Are you sure you want to remove this material?");
    $("#dialog-confirm").dialog({
        resizable: false,
        modal: true,
        title: "Confirmation dialog box",
        height: 200,
        width: 300,
        buttons: {
            "Yes": function () {
                $(this).dialog('close');
                var product_num = elem.data('product_num');
                var material_num = elem.data('material_num');
                var name = elem.data('name');

                var project = $('#project_id').val();
                var ITEM = "forecast|" + project;
                ITEM += "|product-" + product_num;

                var tabs = elem.parents('.tabs-materials');
                elem.parent('.materials').remove();

                totalCalculate(tabs, 'batch_expences', project, ITEM, 1, product_num);

                ITEM += "|" + name;
                ITEM += "|" + material_num;

                $.each(localStorage, function (key, value) {
                    if (key.indexOf(ITEM) == 0) {
                        console.log();
                        localStorage.removeItem(key);
                    }
                });

                $.ajax({
                    type: 'POST',
                    data: {product_num: product_num, material_num: material_num, name: name},
                    url: '/delmaterial',
                    success: function (data) {
                        elem.parent('.materials').remove();

                    },
                    error: function (xhr, str) {
                        alert('Возникла ошибка: ' + xhr.responseCode);
                    }
                });
            },
            "No": function () {
                $(this).dialog('close');
            }
        }
    });
}
function deleteAdditionalMaterial(el) {
    var elem = $(el);
    $("#dialog-confirm").html("Are you sure you want to remove this material?");
    $("#dialog-confirm").dialog({
        resizable: false,
        modal: true,
        title: "Confirmation dialog box",
        height: 200,
        width: 300,
        buttons: {
            "Yes": function () {
                $(this).dialog('close');
                var material_num = elem.data('material_num');
                var name = elem.data('name');

                var project = $('#project_id').val();
                var ITEM = "forecast|" + project;

                var tabs = elem.parents('.tabs-materials');

                //totalCalculate(tabs, 'batch_expences', project, ITEM, 1, product_num);

                ITEM += "|" + name;
                ITEM += "|" + material_num;

                $.each(localStorage, function (key, value) {
                    if (key.indexOf(ITEM) == 0) {
                        localStorage.removeItem(key);
                    }
                });
                elem.parent('.materials').remove();
                //$.ajax({
                //    type: 'POST',
                //    data: {material_num: material_num, name: name},
                //    url: '/delmaterial',
                //    success: function (data) {
                //
                //
                //    },
                //    error: function (xhr, str) {
                //        alert('Возникла ошибка: ' + xhr.responseCode);
                //    }
                //});
            },
            "No": function () {
                $(this).dialog('close');
            }
        }
    });
}
function addDirectMaterial(el) {
    var product_num = $(el).data('product_num');
    var direct_material_num = $('#next_direct_material').val();
    $.ajax({
        type: 'POST',
        data: {product_num: product_num, direct_material_num: direct_material_num},
        url: '/adddirectmaterial',
        success: function (data) {
            $(el).parents('.tabs-materials').find('.direct-materials-block').append(data);
            $('#next_direct_material').val(Number(direct_material_num) + 1);
            reloadJS();
        },
        error: function (xhr, str) {
            alert('Возникла ошибка: ' + xhr.responseCode);
        }
    });
    return false;
}
function addOtherVariableCost(el) {
    var product_num = $(el).data('product_num');
    var next_other_variable_cost = $('#next_other_variable_cost').val();
    $.ajax({
        type: 'POST',
        data: {product_num: product_num, other_variable_cost_num: next_other_variable_cost},
        url: '/addothervariablecost',
        success: function (data) {
            $(el).parents('.tabs-materials').find('.other-variable-cost-block').append(data);
            $('#next_other_variable_cost').val(Number(next_other_variable_cost) + 1);
            reloadJS();
        },
        error: function (xhr, str) {
            alert('Возникла ошибка: ' + xhr.responseCode);
        }
    });
    return false;
}

function addAdditionalMaterials(el) {
    var product_num = $(el).data('product_num');
    var render = $(el).data('block');
    var mainBlock = $(el).parents('.additional-materials-block');
    var next_additional_materials_cost = mainBlock.find('.next_additional_materials_cost').val();
    $.ajax({
        type: 'POST',
        data: {additional_materials_cost_num: next_additional_materials_cost, render: render},
        url: '/addadditionalmaterials',
        success: function (data) {
            mainBlock.find('.add-additional-materials-block').append(data);
            mainBlock.find('.next_additional_materials_cost').val(Number(next_additional_materials_cost) + 1);
            reloadJS();
        },
        error: function (xhr, str) {
            alert('Возникла ошибка: ' + xhr.responseCode);
        }
    });
    return false;
}
function addDirectLabor(el) {
    var product_num = $(el).data('product_num');
    var next_direct_labor = $('#next_direct_labor').val();
    $.ajax({
        type: 'POST',
        data: {product_num: product_num, direct_labor_num: next_direct_labor},
        url: '/adddirectlabor',
        success: function (data) {
            $(el).parents('.tabs-materials').find('.direct-labor-block').append(data);
            $('#next_direct_labor').val(Number(next_direct_labor) + 1);
            reloadJS();
        },
        error: function (xhr, str) {
            alert('Возникла ошибка: ' + xhr.responseCode);
        }
    });
    return false;
}

function showHideProduct(el) {
    var elem = $(el);
    var section = elem.parent('.product').find('section');
    if (section.is(':visible')) {
        section.slideUp();
        elem.find('i').animate({borderSpacing: 180}, {
            step: function (now, fx) {
                $(this).css('-webkit-transform', 'rotate(' + now + 'deg)');
                $(this).css('-moz-transform', 'rotate(' + now + 'deg)');
                $(this).css('transform', 'rotate(' + now + 'deg)');
            },
            duration: 'slow'
        });
    } else {
        elem.find('i').animate({borderSpacing: 0}, {
            step: function (now, fx) {
                $(this).css('-webkit-transform', 'rotate(' + now + 'deg)');
                $(this).css('-moz-transform', 'rotate(' + now + 'deg)');
                $(this).css('transform', 'rotate(' + now + 'deg)');
            },
            duration: 'slow'
        });
        section.slideDown();
    }
}


function feedback(el) {
    var form = $(el).attr('id');
    var msg = $('form#' + form).serialize();
    $.ajax({
        type: 'POST',
        url: 'http://www.acl.pp.ua:10101/feedback/data',
        data: msg,
        dataType: 'json',
        success: function (data) {
            if (data.message == 'ok') {
                fancybox('feedback_send');
                $('#' + form).trigger("reset");
                $('#' + form + ' input').removeClass('errorForm');
                return;
            } else if (data == 'error') {
                fancybox('error_send');
                $('#' + form).trigger("reset");
                return;
            }
            $('#' + form).empty();
            $('#' + form).html(data);
            $('#' + form).resize();

            $('ul.error').map(function () {
                $(this).hide();
                $('#' + form + ' [name="' + $(this).data("element") + '"]').addClass('errorForm');
            });
            $('.errorForm').bind('keyup', function () {
                $(this).removeClass('errorForm');
            });
            //$(".noteFormBlock").after('<div class="noteForm"><span class="red">Убедиться в правильности заполнения полей</span> <div>');
        },
        error: function (xhr, str) {
            alert('Возникла ошибка: ' + xhr.responseCode);
        }
    });
}
function fancybox(el) {
    $.fancybox({
        prevEffect: 'none',
        nextEffect: 'none',
        openEffect: 'elastic',
        closeEffect: 'elastic',
        href: '#' + el,
        padding: 0,
        margin: 0,
        fitToView: false,
        closeBtn: true,
        scrolling: false,
        helpers: {
            title: null,
            buttons: null
        }
    });
}

function auth() {
    var msg = $('form#authForm').serializeArray();
    $.ajax({
        type: 'POST',
        url: '/login',
        data: msg,
        success: function (data) {

            if (data == 'ok') {
                window.location.href= '/c';
                return;
            }

            $('#authForm').empty();
            $('#authForm').html(data);
            $('#authForm').resize();

            $('ul.error').map(function () {
                $(this).hide();
                $('#authForm [name="' + $(this).data("element") + '"]').addClass('errorFormAuth');
            });
            $('.errorForm').bind('keyup', function () {
                $(this).removeClass('errorForm');
            })
        },
        error: function (xhr, str) {
            alert('Возникла ошибка: ' + xhr.responseCode);
        }
    });

}