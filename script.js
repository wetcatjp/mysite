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

    // 仕上がり日程カレンダー機能
    const calendarContainer = document.getElementById('calendar-container');
    const deliveryDateDisplay = document.getElementById('delivery-date-display');

    if (calendarContainer && deliveryDateDisplay) {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // 時刻をリセットして日付のみで比較
        let currentYear = today.getFullYear();
        let currentMonth = today.getMonth(); // 0 (Jan) to 11 (Dec)
        const HOLIDAY = 4; // 木曜日

        // 仕上がり日を計算する関数
        function calculateDeliveryDate(startDate, businessDays) {
            let deliveryDate = new Date(startDate);
            let daysAdded = 0;
            while (daysAdded < businessDays) {
                deliveryDate.setDate(deliveryDate.getDate() + 1);
                if (deliveryDate.getDay() !== HOLIDAY) {
                    daysAdded++;
                }
            }
            return deliveryDate;
        }

        function renderCalendar(year, month) {
            calendarContainer.innerHTML = ''; // カレンダーをクリア
            deliveryDateDisplay.innerHTML = '日付を選択すると仕上がり予定日が表示されます。'; // 初期メッセージ

            const monthNames = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
            const dayNames = ["日", "月", "火", "水", "木", "金", "土"];

            const header = document.createElement('div');
            header.className = 'calendar-header';
            header.innerHTML = `
                <button id="prev-month">&lt;</button>
                <h2>${year}年 ${monthNames[month]}</h2>
                <button id="next-month">&gt;</button>
            `;
            calendarContainer.appendChild(header);

            const daysRow = document.createElement('div');
            daysRow.className = 'calendar-days';
            dayNames.forEach((day, index) => {
                const dayCell = document.createElement('div');
                dayCell.textContent = day;
                if (index === HOLIDAY) {
                    dayCell.style.color = '#aaa'; // 曜日の「木」をグレーに
                }
                daysRow.appendChild(dayCell);
            });
            calendarContainer.appendChild(daysRow);

            const datesGrid = document.createElement('div');
            datesGrid.className = 'calendar-dates';
            const firstDayOfMonth = new Date(year, month, 1).getDay();
            const daysInMonth = new Date(year, month + 1, 0).getDate();

            for (let i = 0; i < firstDayOfMonth; i++) {
                const emptyCell = document.createElement('div');
                emptyCell.className = 'date-cell empty';
                datesGrid.appendChild(emptyCell);
            }

            for (let day = 1; day <= daysInMonth; day++) {
                const dateCell = document.createElement('div');
                dateCell.className = 'date-cell';
                const currentDate = new Date(year, month, day);

                if (currentDate.getDay() === HOLIDAY) {
                    dateCell.classList.add('holiday');
                }

                dateCell.textContent = day;
                dateCell.dataset.date = currentDate.toISOString().split('T')[0];

                if (currentDate.getTime() === today.getTime()) {
                    dateCell.classList.add('today');
                }

                dateCell.addEventListener('click', () => {
                    if (dateCell.classList.contains('holiday')) {
                        return; // 定休日は何もしない
                    }

                    const selectedDate = new Date(dateCell.dataset.date);
                    const standardDeliveryDate = calculateDeliveryDate(selectedDate, 2); // 2営業日仕上げ

                    const formattedDate = `${standardDeliveryDate.getFullYear()}年${standardDeliveryDate.getMonth() + 1}月${standardDeliveryDate.getDate()}日`;
                    deliveryDateDisplay.innerHTML = `受付日: ${month + 1}月${day}日 → <strong style="color: #FF6B35;">通常仕上がり予定: ${formattedDate}</strong>`;
                });
                datesGrid.appendChild(dateCell);
            }
            calendarContainer.appendChild(datesGrid);

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

    // TODO: サービスカードのインタラクション (ホバーエフェクトなど)
});
