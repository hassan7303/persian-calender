<?php

/**
 * Plugin Name: persian Calendar
 * 
 * Description: A plugin to manage calendar display on the calendar page.
 * 
 * Version: 1.0.0
 * 
 * Author: hassan Ali Askari
 * Author URI: https://t.me/hassan7303
 * Plugin URI: https://github.com/hassan7303
 * 
 * License: MIT
 * License URI: https://opensource.org/licenses/MIT
 * 
 * Email: hassanali7303@gmail.com
 * Domain Path: https://hsnali.ir
 */


if (!defined('ABSPATH')) {
    exit;
}

/**
 * Displays the calendar content on the "calender" page.
 *
 * This function checks if the current request is for the "calender" page. If so,
 * it includes the necessary styles and scripts, displays the calendar header
 * with navigation buttons, and generates the structure for the calendar body,
 * including the day names and days of the month.
 *
 * The calendar layout is built using HTML and will be populated with
 * the appropriate date information via JavaScript.
 *
 * @return void
 */
function custom_calendar_display():void
{

    $slug = $_SERVER['REQUEST_URI'];
    if ($slug == '/calender/') {

        get_header()
            ?>

        <head>
            <link href="<?php echo plugin_dir_url(__FILE__) . 'assets/css/style.css'; ?>" rel="stylesheet" type="text/css">

            <script src="<?php echo plugin_dir_url(__FILE__) . 'assets/js/script.js'; ?>"></script>
            <script src="<?php echo plugin_dir_url(__FILE__) . 'libs/jalaali-js/dist/jalaali.min.js'; ?>"></script>
        </head>
        <section class="body_calender">
            <div class="calendar-container">
                <div class="calendar-header">
                    <button id="prevMonth">ماه قبل</button>
                    <span id="month-year"></span>
                    <button id="nextMonth">ماه بعد</button>
                </div>
                <div class="calendar-body">
                    <div class="day-names">
                        <div>شنبه</div>
                        <div>یک‌شنبه</div>
                        <div>دوشنبه</div>
                        <div>سه‌شنبه</div>
                        <div>چهارشنبه</div>
                        <div>پنج‌شنبه</div>
                        <div>جمعه</div>
                    </div>
                    <div id="days" class="days"></div>
                </div>
            </div>
        </section>
        <?php

        get_footer();
        
        exit;
    }
}
add_action('init', 'custom_calendar_display');

