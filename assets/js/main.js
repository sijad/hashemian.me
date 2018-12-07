var months = [
  'فروردین',
  'اردیبهشت',
  'خرداد',
  'تیر',
  'مرداد',
  'شهریور',
  'مهر',
  'آبان',
  'آذر',
  'دی',
  'بهمن',
  'اسفند',
];

document.querySelectorAll("[dir=\"rtl\"] time").forEach(function(e) {
  var datetime = e.getAttribute("datetime").split("-").map(function(t) {
    return parseInt(t, 10);
  });
  var j = toJalaali(datetime[0], datetime[1], datetime[2]);
  e.innerText = j.jd + " " + months[j.jm] + " " + j.jy;
});
