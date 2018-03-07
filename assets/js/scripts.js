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
    var baseCountInputMixin = {
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

    var baseSelectMixin = {
        data: {
            selected: '',
            options: [],
            active: false
        },
        methods: {
            dropdown: function (events) {
                this.active = !this.active;
            },
            select: function (idx) {
                this.selected = this.options[idx].value;
                this.dropdown();
            }
        },
        created: function () {
            this.selected = this.options.length > 0 ? this.options[0].value : 0;
        }
    }

    function createSelect(id, options) {
        var select = new Vue({
            el: id,
            data: {
                options: options
            },
            mixins: [baseSelectMixin]
        });
    }

    function createCountInput(id, items, displayFunc) {
        var guestInput = new Vue({
            el: id,
            data: {
                text: '',
                active: false,
                items: items
            },
            mixins: [baseCountInputMixin],
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
    createSelect("#guest-select", [
        { text: '1', value: '1'},
        { text: '2', value: '2'},
        { text: '3', value: '3'},
    ]);

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
    $("#hamburger-menu").click(function (events) {
        $("#sidebar-menu").addClass('active');
        $("#pg-pb-global").addClass('active');
    });
    $("#pg-pb-global, #close-sidebar").click(function (events) {
        $("#sidebar-menu").removeClass('active');
        $("#pg-pb-global").removeClass('active');
    })

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