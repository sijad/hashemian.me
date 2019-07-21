---
title: "معرفی موتور Hermes برای React Native"
date: 2019-07-19T11:00:15+03:30
draft: false
type: post
---

فیسبوک در Chain React 2019، موتور متن‌باز جاوا اسکریپت [Hermes](https://hermesengine.dev/) رو معرفی کرد که برای React Native بهینه شده تا حجم و زمان راه‌اندازی App رو کاهش بده و حافظه‌اصلی کمتری هنگام استفاده از App اشغال بشه که البته یک مزیت خیلی عالی برای گوشی‌های رده پایین که محدودیت حافظه‌اصلی دارن محسوب میشه.

{{< figure src="./hermesstats-1.jpg" alt="Hermes Status Compare" title="مقایسه نتایج Hermes" >}}

React Native به صورت پیشفرض از [JavaScriptCore](https://developer.apple.com/documentation/javascriptcore) استفاده میکنه که برای Android یکسری مشکلات ایجاد کرده. برای مثال به دلیل [تغییرات زیاد](https://github.com/facebook/android-jsc) داخل jscore (که بشه توی Android اجراش کرد) و کمبود منابع، چندین سال از [آخرین بروزرسانی](https://github.com/facebook/react-native/issues/19737) اون میگذشت که البته بعد از بروزرسانی jscore مشکلات دیگه‌ای اضافه شد، مثلا حجم App تقریبا [دو برابر](https://github.com/facebook/react-native/issues/23575) شدش و یا اینکه موقع Debug کردن موتور [v8 مرورگر کروم](https://v8.dev/)، [جایگزین jscore میشه](https://facebook.github.io/react-native/docs/javascript-environment#javascript-runtime).

یکی از کارهای مهمی که Hermes انجام میده اینه که موقع خروجی گرفتن از App کدهای جاوااسکریپت رو به Bytecode تبدیل میکنه. یعنی اینکه عمل Parse و Compile کد رو جلو جلو انجام میده که تاثییر زیادی در زمان راه‌اندازی App داره.

{{< figure src="./HermesOSSChainReact_blog_FIN_1-1.gif" alt="What Hermes does" title="کاری که Hermes انجام میده" >}}

البته این کار یکسری محدودیت هم ایجاد میکنه مثلا دیگه نمیشه از متد `()toString` برای تبدیل توابع به کدشون استفاده کرد که البته داخل محیط React Native کاربردی نداره. (میتونید ویژگی‌ها و محدودیت‌های دیگه Hermes رو از [اینجا](https://github.com/facebook/hermes/blob/master/doc/Features.md) دنبال کنید). علاوه بر این Hermes بهینه‌سازی‌هایی دیگه‌ای هم اعمال میکنه، مثلا Stringها رو بصورتی در حافظه‌اصلی [بارگذاری میکنه](https://youtu.be/zEjqDWqeDdg?t=467) که فراخونیشون سریعتر باشه.

برای فعال کردن Hermes، حداقل React Native نسخه 0.60.2 نیاز هست و اگه دوست دارین که Hermes رو امتحان کنید میتونید [این دستورالعمل](https://facebook.github.io/react-native/docs/hermes/) رو دنبال کنید. همچنین میتونید فیلم معرفی Hermes رو [اینجا ببینید](https://youtu.be/zEjqDWqeDdg).

راستی از اونجایی که این موضوع برام جالب بود، کمی جستجو کردم تا بازخورد کاربرهای دیگه هم بدونم، که با یک موتور جاوااسکریپت دیگه به نام [QuickJS](https://bellard.org/quickjs/) آشنا شدم که آقای [Bellard](https://en.wikipedia.org/wiki/Fabrice_Bellard) همین تازگی‌ها منتشر کرده و خیلی خوب بهینه شده. یکسری ویژگیهای QuickJS که بنظرم جالب اومدن:

* میتونید کد JavaScript خودتون رو بصورت Stand-alone کامپایل و منتشر کنید. (یعنی دیگه برای مثال وابستگی به node یا غیره ندارید)
* کد js رو به زبان c تبدیل و بصورت Embed داخل کد c ازش استفاده کنید یا برعکس. (که البته کد c تولید شده خوانایی زیادی نداره و بیشترش Bytecode هست)
* میتونید کدهای جاواساکریپت رو برای webassemly کامپایل کنید و داخل مرورگر اجراشون کنید.
* تقریبا بصورت کامل از ES2019 پشتیبانی میکنه.
* [کارایی خیلی خوبی](https://bellard.org/quickjs/bench.html) نسبت به رقیب‌های قدیمی خودش داره.

دوستدارم بدونم Hermes و QuickJS نسبت به هم چه سرعتی دارن و اینکه آیا میشه کدهای تولید شده توسط QuickJS رو به React Native متصل کرد؟ کاریشون چقدر بهتره؟

[منبع عکس‌های](https://code.fb.com/android/hermes/)
