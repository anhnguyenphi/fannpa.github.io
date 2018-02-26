$(function () {
    "use strict";
    function createDatepicker(id) {
        $(id).datepicker();
        $(id).datepicker("option", "dateFormat", "dd/mm/yy");
        $(id).datepicker("setDate", new Date());
    }
    createDatepicker("#checkin");
    createDatepicker("#checkout");

    $('#rooms').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '#rooms-nav'
    });
    $('#rooms-nav').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '#rooms',
        centerMode: true,
        arrows: false,
        focusOnSelect: true
    });

    $("#booking-slider").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true
    });
});