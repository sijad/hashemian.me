---
title: "بررسی وجود نسخه جدید Application"
date: 2018-12-08T16:59:11+03:30
categories: ["توسعه"]
---

چند وقت پیشا یک [package](https://github.com/karjooplus/react-native-cafebazaar-intents) برای React Native طراحی کردیم که اجازه استفاده از ویژگی امتیاز دادن کافه بازار رو با js فراهم میکنه، بعدش یه نفری بهمون پیشنهاد کرد که [یکی](http://developers.cafebazaar.ir/en/docs/bazaar-services-update-check/) دیگه از قابلیت های بازار رو هم برای React Native پیاده سازی کنیم، که این اجازه رو می ده که بررسی کنیم آیا برنامه ای که روی دستگاه نصب هست بروز هستش یا خیر.

بعدازاینکه مستندات کافه بازار یه نگاهی انداختم واقعاً جا خوردم که چرا این قدر پیچیده طراحی شده، توی این نوشته قصد دارم چند راه ساده تر رو پیشنهاد کنم که بتونید بررسی کنید آیا آخرین نسخه Application یا بازیتون روی دستگاه کاربر نصب شده یا خیر. **مثال های مقاله با js زده شدند ولی تمامی راه حل ها به صورت Native هم قابل پیاده سازی هستند.**

## خواندن نسخه از صفحه کافه بازار

این راه حل رو فقط به عنوان مثال می زنم، و خودم به **هیچ وجه توصیه اش نمی کنم** چون ممکنه طراحی صفحه تغییر کنه و برنامتون به مشکل بر بخوره، همچنین این روش حجم تقریباً زیادی دانلود و پردازش میکنه.

میتونید صفحه کافه بازار برنامتون رو دانلود کنید و بعدش آخرین نسخه برنامتون رو ازش استخراج کنید:

```js
fetch('https://cafebazaar.ir/app/com.hitalent.hitalent/?l=en')
  .then(res => res.text())
  .then(res => res.replace(/[\n\s]+/g, ''))
  .then(res => res.match(/<span>Version<\/span><spanclass="pull-right">(.+?)<\/span>/))
  .then(ver => console.log(ver[1]))
```

## آپلود آخرین نسخه در یک فال متنی

تقریباً مثل راه حل اول ولی خیلی تمیزتر، به این صورت که شماره آخرین نسخه برنامه داخل یه فایل متنی ذخیره میشه و درجایی آپلود میشه، برنامه این فایل متنی رو دانلود میکنه و نسخه آخر رو با شماره نسخه نصب شده مقایسه میکنه:

```js
fetch('http://txti.es/pkjcj')
  .then(res => res.text())
  .then(res => res.match(/<p>latest_version:(.+?)<\/p>/))
  .then(m => m[1])
  .then(ver => console.log(ver) /* e.g. if (ver > currentVersion) { alert('you need upgrade!') } */)
```

میتونید فایل رو روی هاست خودتون آپلود کنید یا اینکه داخل سرویس هایی که بهتون اجازه ساخت فایل متنی میدن بارگذاری کنید:

* https://gist.github.com
* http://txti.es
* https://pastebin.com
* https://gitlab.com/dashboard/snippets

## دریافت آخرین نسخه از API خودتون

این راه حل قدرت بیشتری بهتون میده ولی نیاز به این هست که شما یک سرور داشته باشید، نحوه پیاده سازیش تقریباً مثل روش قبل هست ولی به جای فایل متنی، اطلاعات از یک API دریافت میشن:

```js
fetch('https://api.mydomain.com/current_version')
  .then(res => res.json())
  .then(ver => console.log(ver))
```

حتی میتونید نسخه فعلی رو به API ارسال کنید و پردازش مقایسه نسخه رو هم به روی سرور ببرید که به شما قدرت بیشتری در آینده میده.


## استفاده از Remote Config Firebase

در Remote Config میتونید یه پارامتر جدید (مثلاً `needUpgrade`) اضافه کنید و با شروطی که تعریف می کنید، مقادیرش رو تغییر بدید، مثلاً اگه آخرین نسخه برنامتون 6 هست میتونید شروط رو به این شکل تعریف کنید:

{{< figure src="./firebase-remote-config.jpeg" alt="Firebase Remote Config Example" title="مثال Firebase Remote Config" >}}

در مثال بالا یک پارامتر به اسم `needUpgrade` تعریف شده که دو مقدار `yes` و `no` داره، مقدار این پرامتر وقتی `yes` میشه که شرط *it is not latest version* برقرار باشه، داخل شرط از مقدار `^(?!6).*` برای regex استفاده شده که دربرگیرنده تمامی خطوطی هست که با `6` شروع نمیشن.

بعدش میتونید این پارامتر رو سمت برنامتون فراخوانیش کنید:

```js
firebase.config().setDefaults({
  needUpgrade: "no",
});

firebase.config().fetch()
  .then(() => {
    return firebase.config().activateFetched();
  })
  .then((activated) => {
    return firebase.config().getValue('needUpgrade');
  })
  .then((snapshot) => {
    const needUpgrade = snapshot.val();

    if (needUpgrade == "yes") {
      // upgrade needed
    }
  })
  .catch(console.error);
```

برای اطاعات بیشتر میتونی [مستندات Remote Config Firebase](https://firebase.google.com/docs/remote-config/) و [مستندات Remote Config برای React Native](https://rnfirebase.io/docs/v5.x.x/config/example) رو مطالعه کنید.

## استفاده از Code Push

چون نمیشه این روش رو به صورت Native پیاده سازیش کرد بهش فقط یه اشاره کوچیک می کنم، با استفاده از Code Push میتونید نسخه جدید رو روی دستگاه کاربر نصب کنید، و البته [CodePush.sync](https://github.com/Microsoft/react-native-code-push/blob/master/docs/api-js.md#codepushsync) این اجازه رو هم به شما می ده که متونید با استفاده از اون درصورتی که برنامتون نیاز به به روزرسانی داشته باشه مطلع بشید.

برای اطلاعات بیشتر میتونید [مستندات Code Push برای React Native](https://github.com/Microsoft/react-native-code-push) رو مطالعه کنید.
