$(function () {
  $('input[name="daterange"]').daterangepicker({
    opens: 'left',
    locale: {
      format: "MM/DD/YYYY",
    }
  }, function (start, end, label) {
    console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
  });
});