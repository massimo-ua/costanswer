function calculate(obj, el, project, ITEM, key, product_num, direct_material_num) {
    var SEP = '|';
    var period_number = localStorage["forecast|" + project + SEP + 'period_number'];
    var result = false;
    var i = 0;

    if (el == 'finished_goods_ending') {
        if (key <= period_number) {
            var finished_goods_manufactured = $('#finished_goods_manufactured_' + key + '_' + product_num).val();
            var finished_goods_sold = $('#finished_goods_sold_' + key + '_' + product_num).val();
            var finished_goods_beginning = $('#finished_goods_beginning_' + key + '_' + product_num).val();

            if (finished_goods_manufactured && finished_goods_sold && finished_goods_beginning) {
                //FORMULA
                result = Number(finished_goods_beginning) + Number(finished_goods_manufactured) - Number(finished_goods_sold);

                $('#finished_goods_ending_' + key + '_' + product_num).val(result);
                localStorage.setItem(ITEM + SEP + 'finished_goods_ending|' + key, result);

                var finished_goods_beginning_next = '#finished_goods_beginning_' + (key + 1) + '_' + product_num;
                $(finished_goods_beginning_next).val(result);
                localStorage.setItem(ITEM + SEP + 'finished_goods_beginning|' + key, result);

                calculate(el, project, ITEM, key + 1, product_num);
            }
        }
    }

    if (el == 'raw_material_purchased') {
        for (i = 1; i <= period_number; i++) {
            var total_raw_material_purchased = $('#total_raw_material_purchased_' + direct_material_num + '_' + product_num).val();
            var purchasing_price_per_unit = $('#purchasing_price_per_unit_' + direct_material_num + '_' + product_num).val();

            if (total_raw_material_purchased && purchasing_price_per_unit) {
                //FORMULA
                result = Number(total_raw_material_purchased) * Number(purchasing_price_per_unit);
                $('#raw_material_purchased_' + i + '_' + direct_material_num + '_' + product_num).val(result);
                localStorage.setItem(ITEM + SEP + 'direct_materials|' + direct_material_num + '|raw_material_purchased|' + i, result);


                if (i == 1) {
                    $('#season_price_change_rate_val_' + i + '_' + direct_material_num + '_' + product_num).val(result);
                    localStorage.setItem(ITEM + SEP + 'direct_materials|' + direct_material_num + '|season_price_change_rate_val|' + i, result);
                }
                calculate('season_price_change_rate_val', project, ITEM, i + 1, product_num, direct_material_num);
            }
        }
        totalCalculate(obj.parents('.tabs-materials'), 'total_direct_materials_purchased', project, ITEM, 1, product_num);
    }

    if (el == 'season_price_change_rate_val') {
        if (key <= period_number) {
            var season_price_change_rate_perc = $('#season_price_change_rate_perc_' + key + '_' + direct_material_num + '_' + product_num).val();
            var season_price_change_rate_val_first = $('#season_price_change_rate_val_1_' + direct_material_num + '_' + product_num).val();

            if (season_price_change_rate_val_first && season_price_change_rate_perc) {
                //FORMULA
                result = Number(season_price_change_rate_val_first) + Number(season_price_change_rate_val_first * season_price_change_rate_perc / 100);

                $('#season_price_change_rate_val_' + key + '_' + direct_material_num + '_' + product_num).val(result);
                localStorage.setItem(ITEM + SEP + 'direct_materials|' + direct_material_num + '|season_price_change_rate_val|' + key, result);
            } else {
                $('#season_price_change_rate_perc_' + key + '_' + direct_material_num + '_' + product_num).val('');
                var item1 = $('#total_raw_material_purchased_' + direct_material_num + '_' + product_num);
                var item2 = $('#purchasing_price_per_unit_' + direct_material_num + '_' + product_num)
                if (!item1.val() || !item2.val()) {
                    item1.addClass('errorInput');
                    item2.addClass('errorInput');
                }
            }
        }

    }

    if (el == 'total_additional_materials') {

        if (obj.data('type') == 'monthly_payment') {
            for (i = 1; i <= period_number; i++) {
                var val = obj.val();
                $('#'+obj.data('parent')+'-'+obj.data('material_num')+'-'+obj.data('type')+'-'+i).val(val);
                localStorage.setItem(ITEM + SEP + obj.attr('name')+SEP+i, val);
            }
        } else {
            for (i = 1; i <= period_number; i++) {
                result = 0;
                if (i == 1){
                    var monthly_ammount = obj.parents('.materials-table').find('.monthly_ammount').val();
                    var payroll_taxes = obj.parents('.materials-table').find('.payroll_taxes').val();
                    result = Number(monthly_ammount)+Number(payroll_taxes);
                    $('#'+obj.data('parent')+'-'+obj.data('material_num')+'-name_of_personnel-'+i).val(result);
                } else {
                    var prev_price_per_hour = $('#'+obj.data('parent')+'-'+obj.data('material_num')+'-name_of_personnel-'+(i-1)).val();
                    var annual_growth_rate = obj.parents('.materials-table').find('.annual_growth_rate').val();
                    result = prev_price_per_hour * (1 + (annual_growth_rate / 100 / 12));
                    var this_val = decimalAdjust('round', result, '-3');
                    $('#'+obj.data('parent')+'-'+obj.data('material_num')+'-name_of_personnel-'+i).val(this_val);
                }
            }
        }
        totalCalculate(obj, 'total_additional_materials', project, ITEM);
        totalCalculate(obj, 'manufacturing_overhead', project, ITEM);
        totalCalculate(obj, 'operating_expenses', project, ITEM);

    }
}

function totalCalculate(obj, el, project, ITEM, key, product_num) {

    var SEP = '|';
    var period_number = localStorage["forecast|" + project + SEP + 'period_number'];
    var i = 0;
    var item = false;
    var total = 0;
    var totalProd = 0;
    var this_val = 0;
    if (period_number) {
        if (el == 'total_direct_materials_purchased') {
            for (i = key; i <= period_number; i++) {
                total = 0;
                obj.find('.raw_material_purchased').each(function () {
                    if ($(this).data('key') == i && $(this).data('product_num') == product_num) {
                        total = total + Number($(this).val());
                    }
                });
                item = $('#total_direct_materials_purchased_' + i + '_' + product_num);
                item.val(total);
                localStorage.setItem(ITEM + SEP + 'direct_materials|total_direct_materials_purchased|' + i, total);
            }
        }
        if (el == 'batch_expences') {
            for (i = key; i <= period_number; i++) {
                total = 0;
                obj.find('.ammount_per_product').each(function () {
                    if ($(this).data('product_num') == product_num) {
                        total = total + Number($(this).val());
                    }
                });
                item = $('#batch_expences_' + i + '_' + product_num);
                item.val(total);
                localStorage.setItem(ITEM + SEP + 'direct_materials|batch_expences|' + i, total);
            }
        }
        if (el == 'total_direct_materials_beginning') {
            total = 0;
            if (key) {
                obj.parents('.tabs-materials').find('.raw_material_beginning').each(function () {
                    if ($(this).data('key') == key && $(this).data('product_num') == product_num) {
                        total = total + Number($(this).val());
                    }
                });
                item = $('#total_direct_materials_beginning_' + key + '_' + product_num);
                item.val(total);
                localStorage.setItem(ITEM + SEP + 'direct_materials|total_direct_materials_beginning|' + key, total);
            } else {
                for (key = 1; key <= period_number; key++) {
                    total = 0;
                    obj.find('.raw_material_beginning').each(function () {
                        if ($(this).data('key') == key && $(this).data('product_num') == product_num) {
                            total = total + Number($(this).val());
                        }
                    });
                    item = $('#total_direct_materials_beginning_' + key + '_' + product_num);
                    item.val(total);
                    localStorage.setItem(ITEM + SEP + 'direct_materials|total_direct_materials_beginning|' + key, total);
                }
            }

        }
        if (el == 'total_direct_materials_ending') {

            if (key) {
                obj.parents('.tabs-materials').find('.raw_material_ending').each(function () {
                    if ($(this).data('key') == key && $(this).data('product_num') == product_num) {
                        total = total + Number($(this).val());
                    }
                });
                item = $('#total_direct_materials_ending_' + key + '_' + product_num);
                item.val(total);
                localStorage.setItem(ITEM + SEP + 'direct_materials|total_direct_materials_ending|' + key, total);
            } else {
                for (key = 1; key <= period_number; key++) {
                    total = 0;
                    obj.find('.raw_material_ending').each(function () {
                        if ($(this).data('key') == key && $(this).data('product_num') == product_num) {
                            console.log($(this).val());
                            total = total + Number($(this).val());
                        }
                    });
                    item = $('#total_direct_materials_ending_' + key + '_' + product_num);
                    item.val(total);
                    localStorage.setItem(ITEM + SEP + 'direct_materials|total_direct_materials_ending|' + key, total);
                }
            }
        }
        if (el == 'prod_direct_labor') {
            for (i = 1; i <= period_number; i++) {
                total = 0;
                obj.find('.worker').each(function () {
                    if ($(this).data('key') == i && $(this).data('product_num') == product_num) {
                        total = total + Number($(this).val());
                    }
                });
                item = $('#prod_direct_labor_' + i + '_' + product_num);
                this_val = decimalAdjust('round', total, '-3');
                item.val(this_val);
                localStorage.setItem(ITEM + SEP + 'direct_labor|prod_direct_labor|' + i, this_val);
            }
        }
        if (el == 'prod_prime_cost') {
            for (i = 1; i <= period_number; i++) {
                total = 0;
                totalProd = 0;
                var total_direct_materials = $('#prod_direct_materials_' + i + '_' + product_num).val();
                var total_direct_labor  = $('#prod_direct_labor_' + i + '_' + product_num).val();
                if (total_direct_materials && total_direct_labor){
                    totalProd = Number(total_direct_materials)+Number(total_direct_labor);
                    this_val = decimalAdjust('round', totalProd, '-3');
                    $('#prod_prime_cost_' + i + '_' + product_num).val(this_val);
                    localStorage.setItem(ITEM + SEP + 'prod_prime_cost|' + i, this_val);

                    //Variable cost batch
                    $('#variable_cost_batch_' + i + '_' + product_num).val(this_val);
                    localStorage.setItem(ITEM + SEP + 'variable_cost_batch|' + i, this_val);

                    //Variable cost unit
                    var finished_goods_manufactured = $('#finished_goods_manufactured_' + i + '_' + product_num).val();
                    var variable_cost_unit = this_val/finished_goods_manufactured;
                    variable_cost_unit = decimalAdjust('round', variable_cost_unit, '-3');
                    $('#variable_cost_unit_' + i + '_' + product_num).val(variable_cost_unit);
                    localStorage.setItem(ITEM + SEP + 'variable_cost_unit|' + i, variable_cost_unit);

                    //Total prime cost
                    $('#tabs .add-products-block').find('input').each(function () {
                        if ($(this).data('key') == i && $(this).data('type') == 'prod_prime_cost' ) {
                            total = total + Number($(this).val());
                        }
                    });
                    this_val = decimalAdjust('round', total, '-3');
                    $('#total_prime_cost-'+ i).val(this_val);
                    $('#total_variable_cost-'+ i).val(this_val);
                    localStorage.setItem(ITEM + SEP +'total_prime_cost'+ SEP+ i, this_val);
                    localStorage.setItem(ITEM + SEP +'total_variable_cost'+ SEP+ i, this_val);

                }
            }

            for (i = 1; i <= period_number; i++) {
                //Allocation ratio
                $.each(localStorage, function (key, value) {
                    //forecast|project-1|product-1|prod_prime_cost|1
                    if (key.indexOf('prod_prime_cost')+1) {
                        var arr = key.split('|');
                        if (arr[4] == i){
                            var prodNum = arr[2].substr(8);
                            var total_prime_cost =   $('#total_prime_cost-'+ i).val();
                            var ratioVal = value/total_prime_cost *100;
                            this_val = decimalAdjust('round', ratioVal, '0');
                            $('#allocation_ratio_' + i + '_' + prodNum).val(this_val);
                            localStorage.setItem(ITEM + SEP +'allocation_ratio'+ SEP+ i, this_val);
                        }
                    }
                });
            }
            totalCalculate(false, 'moh_per_batch', project, ITEM);
            totalCalculate(false, 'moh_period_cost_per_batch', project, ITEM);

        }
        if (el == 'total_additional_materials') {
            for (i = 1; i <= period_number; i++) {
                total = 0;
                obj.parents('.add-additional-materials-block').find('input').each(function () {
                    if ($(this).data('key') == i) {
                        total = total + Number($(this).val());
                    }
                });
                    this_val = decimalAdjust('round', total, '-3');
                    $('#'+obj.data('parent')+'-total-'+ i).val(this_val);
                    localStorage.setItem(ITEM + SEP +obj.data('parent')+ SEP +'total'+ SEP+ i, this_val);

            }
        }

        if (el == 'manufacturing_overhead') {
            for (i = 1; i <= period_number; i++) {
                total = 0;
                var it1 = Number($('#indirect_materials-total-'+i).val());
                var it2 = Number($('#property_and_factory_taxes-total-'+i).val());
                var it3 = Number($('#indirect_labor-total-'+i).val());
                var it4 = Number($('#leasing_payments-total-'+i).val());
                var it5 = Number($('#support_administrative_sales_marketing-total-'+i).val());
                var it6 = Number($('#amortization-total-'+i).val());
                var it7 = Number($('#other_overhead_expences-total-'+i).val());
                var it8 = Number($('#insurance-total-'+i).val());
       
                if (it1 && it2 && it3 && it4 && it5 && it6 && it7 && it8){
                    total = it1+it2+it3+it4+it5+it6+it7+it8;
                }
                this_val = decimalAdjust('round', total, '-3');
                $('#manufacturing_overhead-'+ i).val(this_val);
                localStorage.setItem(ITEM + SEP +'manufacturing_overhead'+ SEP+ i, this_val);
            }
            totalCalculate(false, 'moh_per_batch', project, ITEM);
        }

        if (el == 'operating_expenses') {
            for (i = 1; i <= period_number; i++) {
                total = 0;
                var it1 = Number($('#general_and_administrative_expenses-total-'+i).val());
                var it2 = Number($('#sales_and_marketing_expenses-total-'+i).val());
                var it3 = Number($('#other_period_expenses-total-'+i).val());

                if (it1 && it2 && it3){
                    total = it1+it2+it3;
                }
                this_val = decimalAdjust('round', total, '-3');
                $('#operating_expenses-'+ i).val(this_val);
                localStorage.setItem(ITEM + SEP +'operating_expenses'+ SEP+ i, this_val);
            }
            totalCalculate(false, 'moh_period_cost_per_batch', project, ITEM);
        }

        if (el == 'moh_per_batch') {
            for (i = 1; i <= period_number; i++) {
                $.each(localStorage, function (key, value) {
                    if (key.indexOf('allocation_ratio')+1) {
                        var arr = key.split('|');
                        if (arr[4] == i){
                            var prodNum = arr[2].substr(8);
                            var manufacturing_overhead =   $('#manufacturing_overhead-'+ i).val();

                            //MOH per batch
                            var ratioVal = value/100*manufacturing_overhead;
                            this_val = decimalAdjust('round', ratioVal, '0');
                            $('#moh_per_batch_' + i + '_' + prodNum).val(this_val);
                            localStorage.setItem(ITEM + SEP +'moh_per_batch'+ SEP+ i, this_val);

                            //MOH per unit
                            var finished_goods_manufactured = $('#finished_goods_manufactured_' + i + '_' + prodNum).val();
                            var moh_per_unit = this_val/finished_goods_manufactured;
                            $('#moh_per_unit_' + i + '_' + prodNum).val(moh_per_unit);
                            localStorage.setItem(ITEM + SEP +'moh_per_unit'+ SEP+ i, moh_per_unit);


                            //Total cost of batch
                            var moh_per_batch = Number($('#moh_per_batch_' + i + '_' + prodNum).val());
                            var prod_prime_cost = Number($('#prod_prime_cost_' + i + '_' + prodNum).val());
                            var work_in_process_beginning = Number($('#work_in_process_beginning_' + i + '_' + prodNum).val());
                            var work_in_process_ending = Number($('#work_in_process_ending_' + i + '_' + prodNum).val());
                            var total_cost_of_batch = moh_per_batch + prod_prime_cost + work_in_process_beginning - work_in_process_ending;
                            this_val = decimalAdjust('round', total_cost_of_batch, '-3');
                            $('#total_cost_of_batch_' + i + '_' + prodNum).val(this_val);
                            localStorage.setItem(ITEM + SEP +'total_cost_of_batch'+ SEP+ i, this_val);

                            //Fixed cost batch
                            var fixed_cost_batch = Number(this_val)-Number(prod_prime_cost);
                            $('#fixed_cost_batch_' + i + '_' + prodNum).val(fixed_cost_batch);
                            localStorage.setItem(ITEM + SEP +'fixed_cost_batch'+ SEP+ i, fixed_cost_batch);

                            //Fixed cost unit
                            var fixed_cost_unit = Number(fixed_cost_batch)/Number(finished_goods_manufactured);
                            $('#fixed_cost_unit_' + i + '_' + prodNum).val(fixed_cost_unit);
                            localStorage.setItem(ITEM + SEP +'fixed_cost_batch'+ SEP+ i, fixed_cost_unit);



                            //Current Cost of Goods Manufuctured (COGM)
                            var cogm = total_cost_of_batch/finished_goods_manufactured;
                            $('#cogm_' + i + '_' + prodNum).val(cogm);
                            localStorage.setItem(ITEM + SEP +'cogm'+ SEP+ i, cogm);
                            
                            // Current Sale Price
                            var cogm_mark_up = Number($('#cogm_mark_up_' + i + '_' + prodNum).val());
                            if (cogm_mark_up){
                                var current_sale_price = cogm*(1+cogm_mark_up/100);
                                $('#current_sale_price_' + i + '_' + prodNum).val(current_sale_price);
                                localStorage.setItem(ITEM + SEP +'current_sale_price'+ SEP+ i, current_sale_price);
                            }

                            // Current Sale Price (VAT incl)
                            var vat = Number($('#vat_' + i + '_' + prodNum).val());
                            if (vat){
                                var vat_incl = current_sale_price*(1+vat/100);
                                $('#vat_incl_' + i + '_' + prodNum).val(vat_incl);
                                localStorage.setItem(ITEM + SEP +'vat_incl'+ SEP+ i, vat_incl);
                            }
                            
                            // Current Sale Price (VAT incl)
                            var vat = Number($('#vat_' + i + '_' + prodNum).val());
                            if (vat){
                                var vat_incl = current_sale_price*(1+vat/100);
                                $('#vat_incl_' + i + '_' + prodNum).val(vat_incl);
                                localStorage.setItem(ITEM + SEP +'vat_incl'+ SEP+ i, vat_incl);
                            }



                        }
                    }
                });
            }

        }

        if (el == 'moh_period_cost_per_batch') {
            for (i = 1; i <= period_number; i++) {
                $.each(localStorage, function (key, value) {
                    if (key.indexOf('allocation_ratio')+1) {
                        var arr = key.split('|');
                        if (arr[4] == i){
                            var prodNum = arr[2].substr(8);
                            var manufacturing_overhead =   Number($('#manufacturing_overhead-'+ i).val());
                            var operating_expenses = Number($('#operating_expenses-'+ i).val());

                            //MOH+Period Cost per batch
                            var costVal = value/100*(manufacturing_overhead+operating_expenses);
                            this_val = decimalAdjust('round', costVal, '0');
                            $('#moh_period_cost_per_batch_' + i + '_' + prodNum).val(this_val);
                            localStorage.setItem(ITEM + SEP +'moh_period_cost_per_batch'+ SEP+ i, this_val);

                            //MOH+Period Cost per unit
                            var finished_goods_manufactured = $('#finished_goods_manufactured_' + i + '_' + prodNum).val();
                            var moh_per_unit = this_val/finished_goods_manufactured;
                            $('#moh_period_cost_per_unit_' + i + '_' + prodNum).val(moh_per_unit);
                            localStorage.setItem(ITEM + SEP +'moh_period_cost_per_unit'+ SEP+ i, moh_per_unit);

                            //Total cost of batch + Period Cost
                            var moh_per_batch = Number($('#moh_period_cost_per_batch_' + i + '_' + prodNum).val());
                            var prod_prime_cost = Number($('#prod_prime_cost_' + i + '_' + prodNum).val());
                            var work_in_process_beginning = Number($('#work_in_process_beginning_' + i + '_' + prodNum).val());
                            var work_in_process_ending = Number($('#work_in_process_ending_' + i + '_' + prodNum).val());
                            var total_cost_of_batch = moh_per_batch + prod_prime_cost + work_in_process_beginning - work_in_process_ending;
                            this_val = decimalAdjust('round', total_cost_of_batch, '-3');
                            $('#total_cost_of_batch_period_cost_' + i + '_' + prodNum).val(this_val);
                            localStorage.setItem(ITEM + SEP +'total_cost_of_batch_period_cost'+ SEP+ i, this_val);


                            //Current Cost of Goods Manufuctured (COGM) + Period Cost
                            var cogm_period_cost = total_cost_of_batch/finished_goods_manufactured;
                            $('#cogm_period_cost_' + i + '_' + prodNum).val(cogm_period_cost);
                            localStorage.setItem(ITEM + SEP +'cogm_period_cost'+ SEP+ i, cogm_period_cost);


                        }
                    }
                });
            }

        }

        if (el == 'total_units_manufactured') {
                $('#tabs .add-products-block').find('input').each(function () {
                    if ($(this).data('key') == key && $(this).data('type') == 'finished_goods_manufactured' ) {
                        total = total + Number($(this).val());
                    }
                });
                    this_val = decimalAdjust('round', total, '-3');
                    $('#total_units_manufactured-'+ key).val(this_val);
                    localStorage.setItem(ITEM + SEP +'total_units_manufactured'+ SEP+ key, this_val);

        }
        
        if (el == 'total_units_sold') {
                $('#tabs .add-products-block').find('input').each(function () {
                    if ($(this).data('key') == key && $(this).data('type') == 'finished_goods_sold' ) {
                        total = total + Number($(this).val());
                    }
                });
                    this_val = decimalAdjust('round', total, '-3');
                    $('#total_units_sold-'+ key).val(this_val);
                    localStorage.setItem(ITEM + SEP +'total_units_sold'+ SEP+ key, this_val);

        }


    }


}



