function openBookingForm() {
    console.log("hahah");
    $("#booking").addClass('active');
    $("#booking-slider").slick('refresh');
}
$(function () {
    "use strict";
    /**
     * 
     * @param {*} id : element id selector
     * @param {*} options : [ {name, max, min, num} ]
     */
    var baseMixin = {
        methods: {
            dropdown: function (events) {
                this.active = !this.active;
            },
            add: function (name) {
                for (var i = 0; i < this.items.length; i++) {
                    if (this.items[i].name === name) {
                        this.items[i].num > this.items[i].max - 1 ? this.items[i].max : ++this.items[i].num;
                        this.display();
                        break;
                    }
                }
            },
            remove: function (name) {
                for (var i = 0; i < this.items.length; i++) {
                    if (this.items[i].name === name) {
                        this.items[i].num < this.items[i].min + 1 ? this.items[i].min : --this.items[i].num;
                        this.display();
                        break;
                    }
                }
            },
            display: function () { }
        },
        created: function () {
            this.display();
        }
    };
    function createCountInput(id, items, displayFunc) {
        var guestInput = new Vue({
            el: id,
            data: {
                text: '',
                active: false,
                items: items
            },
            mixins: [baseMixin],
            methods: {
                display: displayFunc
            }
        })
    }

    function createDatepicker(id) {
        $(id).datepicker();
        $(id).datepicker("option", "dateFormat", "dd/mm/yy");
        $(id).datepicker("setDate", new Date());
    }
    createDatepicker("#checkin");
    createDatepicker("#checkout");

    // Booking form
    $("#booking-close").click(function () {
        $("#booking").removeClass('active');
    });
    createDatepicker("#form-checkin");
    createDatepicker("#form-checkout");
    createCountInput("#guest-count", [
        {
            name: "Người lớn",
            max: 5,
            min: 0,
            num: 2
        }, {
            name: "Trẻ em",
            max: 5,
            min: 0,
            num: 1
        }
    ], function () {
        var tmp = [];
        for (var i = 0; i < this.items.length; i++) {
            tmp.push(this.items[i].num + ' ' + this.items[i].name);
        }
        this.text = tmp.join(', ');
    });
    createCountInput("#room-count", [
        {
            name: "Standard double",
            max: 5,
            min: 0,
            num: 2
        }, {
            name: "Double superior",
            max: 5,
            min: 0,
            num: 1
        }, {
            name: "Double deluxe",
            max: 5,
            min: 0,
            num: 1
        }, {
            name: "Sea view studio",
            max: 5,
            min: 0,
            num: 1
        }, {
            name: "Twin superior",
            max: 5,
            min: 0,
            num: 1
        }, {
            name: "Twin deluxe",
            max: 5,
            min: 0,
            num: 1
        }
    ], function () {
        var total = 0;
        for (var i = 0; i < this.items.length; i++) {
            total += this.items[i].num;
        }
        this.text = total + ' Phòng';
    });
    //

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