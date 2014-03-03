
$(function () {
    $('a.filename.trigger').click(function () {
        var $parent = $(this).closest('.file');
        var isActive = $parent.is('.active');
        $('.file.active').removeClass('active');
        if (isActive) {
            $parent.removeClass('active');
            return false;
        }
        $parent.addClass('active');
    });

    var id = location.href.split('#')[1];
    if (id) {
        $('#' + id + ' .filename.trigger').click();
    }

});

