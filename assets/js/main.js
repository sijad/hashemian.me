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
  var datetime = e.getAttribute("datetime");
  if (!datetime) {
    return;
  }
  datetime = new Date(datetime);
  var j = toJalaali(datetime);
  e.innerText = j.jd + " " + months[j.jm-1] + " " + j.jy;
});
