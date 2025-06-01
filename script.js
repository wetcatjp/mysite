document.addEventListener('DOMContentLoaded', () => {
    // ナビゲーションのプルダウンメニュー処理
    const navItems = document.querySelectorAll('.nav-item.has-submenu');

    navItems.forEach(item => {
        const link = item.querySelector('a');
        const submenu = item.querySelector('.submenu');

        if (link && submenu) {
            // マウスが乗った時の処理
            item.addEventListener('mouseenter', () => {
                submenu.style.display = 'block';
                link.setAttribute('aria-expanded', 'true');
            });

            // マウスが離れた時の処理 (アイテム全体から)
            item.addEventListener('mouseleave', () => {
                submenu.style.display = 'none';
                link.setAttribute('aria-expanded', 'false');
            });

            // キーボード操作のためのフォーカスイベント (オプション)
            link.addEventListener('focus', () => {
                // 他の開いているサブメニューを閉じる (必要に応じて)
                // submenu.style.display = 'block';
                // link.setAttribute('aria-expanded', 'true');
            });
            // link.addEventListener('blur', () => { // blurだけだとサブメニュー操作前に閉じてしまう
            //     submenu.style.display = 'none';
            //     link.setAttribute('aria-expanded', 'false');
            // });
        }
    });

    // Hamburger Menu Toggle
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mainNavUl = document.querySelector('nav.global-nav ul');

    if (hamburgerMenu && mainNavUl) {
        // Set initial ARIA attribute based on current state (nav-active class)
        const isInitiallyExpanded = mainNavUl.classList.contains('nav-active');
        hamburgerMenu.setAttribute('aria-expanded', isInitiallyExpanded.toString());

        hamburgerMenu.addEventListener('click', () => {
            const isExpanded = mainNavUl.classList.toggle('nav-active');
            hamburgerMenu.setAttribute('aria-expanded', isExpanded.toString());

            // Optional: Change hamburger text/icon on toggle
            // if (isExpanded) {
            //     hamburgerMenu.textContent = '✕ CLOSE'; // Or update an inner element
            // } else {
            //     hamburgerMenu.textContent = '☰ MENU'; // Or update an inner element
            // }
        });
    }

    /*
    // 仕上がり日程カレンダー機能
    const calendarContainer = document.getElementById('calendar-container');

    if (calendarContainer) {
        const today = new Date();
        let currentYear = today.getFullYear();
        let currentMonth = today.getMonth(); // 0 (Jan) to 11 (Dec)

        function renderCalendar(year, month) {
            calendarContainer.innerHTML = ''; // カレンダーをクリア

            const monthNames = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
            const dayNames = ["日", "月", "火", "水", "木", "金", "土"];

            // ヘッダー (年月とナビゲーション)
            const header = document.createElement('div');
            header.className = 'calendar-header';
            header.innerHTML = `
                <button id="prev-month">&lt;</button>
                <h2>${year}年 ${monthNames[month]}</h2>
                <button id="next-month">&gt;</button>
            `;
            calendarContainer.appendChild(header);

            // 曜日ヘッダー
            const daysRow = document.createElement('div');
            daysRow.className = 'calendar-days';
            dayNames.forEach(day => {
                const dayCell = document.createElement('div');
                dayCell.textContent = day;
                daysRow.appendChild(dayCell);
            });
            calendarContainer.appendChild(daysRow);

            // 日付グリッド
            const datesGrid = document.createElement('div');
            datesGrid.className = 'calendar-dates';

            const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 (Sun) to 6 (Sat)
            const daysInMonth = new Date(year, month + 1, 0).getDate();

            // 1日の前の空白セル
            for (let i = 0; i < firstDayOfMonth; i++) {
                const emptyCell = document.createElement('div');
                emptyCell.className = 'date-cell empty';
                datesGrid.appendChild(emptyCell);
            }

            // 日付セル
            for (let day = 1; day <= daysInMonth; day++) {
                const dateCell = document.createElement('div');
                dateCell.className = 'date-cell';
                dateCell.textContent = day;
                dateCell.dataset.date = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

                // 今日ならマーク
                if (year === today.getFullYear() && month === today.getMonth() && day === today.getDate()) {
                    dateCell.classList.add('today');
                }

                dateCell.addEventListener('click', () => {
                    console.log(`選択された日付: ${dateCell.dataset.date}`);
                    // 仮の料金情報
                    const isWeekend = new Date(year, month, day).getDay() === 0 || new Date(year, month, day).getDay() === 6;
                    if (isWeekend) {
                        console.log("料金情報: 土日は通常3営業日仕上げ");
                    } else {
                        console.log("料金情報: 通常2営業日仕上げ");
                    }
                    console.log("特急オプション: 即日仕上げ +330円 (税込)"); // 仮の料金
                });
                datesGrid.appendChild(dateCell);
            }
            calendarContainer.appendChild(datesGrid);

            // ナビゲーションボタンのイベントリスナー
            document.getElementById('prev-month').addEventListener('click', () => {
                currentMonth--;
                if (currentMonth < 0) {
                    currentMonth = 11;
                    currentYear--;
                }
                renderCalendar(currentYear, currentMonth);
            });

            document.getElementById('next-month').addEventListener('click', () => {
                currentMonth++;
                if (currentMonth > 11) {
                    currentMonth = 0;
                    currentYear++;
                }
                renderCalendar(currentYear, currentMonth);
            });
        }

        renderCalendar(currentYear, currentMonth);
    }
    */
});
