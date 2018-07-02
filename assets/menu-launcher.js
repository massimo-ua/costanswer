$(document).ready(function($) {
    $('.stellarnav').stellarNav({
        theme: 'dark'
    });
    $('.mobile #menu-root a').not('.dd-toggle').click(function(event) {
        event.stopPropagation();
        var elem = $('#menu-root'); 
        if(elem.css('display') !== 'none') elem.hide();
    });
});