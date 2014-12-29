(function ($) {
    $(function () {
        $('.map').on('click', '.field', function (event) {
            event.preventDefault();
            alert($(this).attr('href'));
        });
    });
}(jQuery));