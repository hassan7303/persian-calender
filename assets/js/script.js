document.addEventListener('DOMContentLoaded', function () {
    const daysContainer = document.getElementById('days');
    const monthYear = document.getElementById('month-year');
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');

    // اسامی ماه‌های شمسی
    const persianMonths = [
        'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
        'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
    ];

    // تعداد روزهای هر ماه
    const monthDays = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];

    // گرفتن تاریخ جاری شمسی
    let currentYear = 1403;
    let currentMonth = 6;  // مهر

    // تابع برای تبدیل تاریخ شمسی به میلادی با استفاده از jalaali-js
    function persianToGregorian(year, month, day) {
        const gregorianDate = jalaali.toGregorian(year, month, day);
        return {
            year: gregorianDate.gy,
            month: gregorianDate.gm,
            day: gregorianDate.gd
        };
    }

    // تابع برای نمایش تقویم
    function renderCalendar() {
        // پاک کردن روزهای قبلی
        daysContainer.innerHTML = '';

        // تنظیم ماه و سال جاری در سربرگ تقویم
        monthYear.textContent = `${persianMonths[currentMonth]} ${currentYear}`;

        // محاسبه اولین روز ماه (برای قرار دادن روزهای خالی)
        const firstDayOfMonth = new Date(currentYear - 621, currentMonth, 1).getDay();

        // افزودن روزهای خالی برای شروع صحیح از روز اول ماه
        for (let i = 0; i < firstDayOfMonth; i++) {
            const emptyDiv = document.createElement('div');
            daysContainer.appendChild(emptyDiv);
        }

        // افزودن روزهای ماه جاری
        for (let i = 1; i <= monthDays[currentMonth]; i++) {
            const dayDiv = document.createElement('div');
            dayDiv.textContent = i;
            dayDiv.addEventListener('click', () => goToPosts(currentYear, currentMonth + 1, i)); // افزودن کلیک برای هر روز
            daysContainer.appendChild(dayDiv);
        }
    }

    // تابع برای هدایت به پست‌های مربوط به روز کلیک شده
    function goToPosts(year, month, day) {
        const { year: gYear, month: gMonth, day: gDay } = persianToGregorian(year, month, day);

        // تبدیل اعداد به فرمت دو رقمی (مثلاً 01 برای روز اول)
        const formattedMonth = gMonth < 10 ? `0${gMonth}` : gMonth;
        const formattedDay = gDay < 10 ? `0${gDay}` : gDay;

        // ایجاد URL برای روز مشخص
        const postUrl = `https://118ahkam.ir/${gYear}/${formattedMonth}/${formattedDay}`;

        // هدایت کاربر به URL
        window.location.href = postUrl;
    }

    // تغییر ماه به عقب
    prevMonthBtn.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;  // بازگشت به آخرین ماه
            currentYear--;      // تغییر سال
        }
        renderCalendar();
    });

    // تغییر ماه به جلو
    nextMonthBtn.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;   // بازگشت به اولین ماه
            currentYear++;      // تغییر سال
        }
        renderCalendar();
    });

    // نمایش تقویم ابتدایی
    renderCalendar();
});
