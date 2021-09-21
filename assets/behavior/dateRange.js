$(function () {
  $('input[name="daterange"]').daterangepicker({
    opens: 'left',
    format: 'MM/DD/YYYY',
    locale: {
      applyLabel: 'Submit',
      monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      firstDay: 1
  }
  }, function (start, end, label) {
    console.log("Date selected: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
  });
});