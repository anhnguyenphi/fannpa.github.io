$(function () {
    function createDatepicker(id) {
        $(id).datepicker();
        $(id).datepicker("option", "dateFormat", "dd/mm/yy");
        $(id).datepicker("setDate", new Date());
    }
    createDatepicker("#checkin");
    createDatepicker("#checkout");
});