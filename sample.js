const weeks = ['日', '月', '火', '水', '木', '金', '土'];
const date = UltraDate();
let year = date.getFullYear();
let month = date.getMonth() + 1;


function showCalendar(year, month) { //カレンダー表示の関数
        const calendarHtml = createCalendar(year, month);
        const sec = document.createElement('section');
        sec.innerHTML = calendarHtml;
        document.querySelector('#calendar').appendChild(sec);
}

function createCalendar(year, month) { //カレンダー作成の関数
    const startDate = new Date(year, month - 1, 1); // 月の最初の日を取得
    const endDate = new Date(year, month,  0); // 月の最後の日を取得
    const endDayCount = endDate.getDate(); // 月の末日
    const lastMonthEndDate = new Date(year, month - 1, 0); // 前月の最後の日の情報
    const lastMonthendDayCount = lastMonthEndDate.getDate(); // 前月の末日
    const startDay = startDate.getDay(); // 月の最初の日の曜日を取得
    let dayCount = 1; // 日にちのカウント
    let calendarHtml = ''; // HTMLを組み立てる変数

    calendarHtml += '<h1>' + year  + '/' + month + '</h1>';
    calendarHtml += '<table>';

    // 曜日の行を作成
    for (let i = 0; i < weeks.length; i++) {
        calendarHtml += '<td>' + weeks[i] + '</td>';
    }

    for (let w = 0; w < 6; w++) {
        calendarHtml += '<tr>';
        for (let d = 0; d < 7; d++) {
            if (w == 0 && d < startDay) {
                // 1行目で1日の曜日の前
                let num = lastMonthendDayCount - startDay + d + 1;
                calendarHtml += '<td id=dis-td'+num+' class="is-disabled">' + num + '</td>';

            } else if (dayCount > endDayCount) {
                // 末尾の日数を超えた
                if(w== 5 && d == 0){ //要らない一番最後の薄いグレーの部分を消す。
                    break;
                }
                let num = dayCount - endDayCount
                calendarHtml += '<td id=dis-td'+num+' class="is-disabled">' + num + '</td>'
                dayCount++

            } else {
                date.setFullYear(year,month-1,dayCount); 
                if(date.isHoliday()){
                    calendarHtml += '<td id="td'+ dayCount + '" class="syukuzitsu">' + dayCount +'<br>' +date.getHoliday() + '</td>'
                }else{
                    calendarHtml += '<td id=td'+ dayCount + '>' + dayCount + '</td>'
                    date.setFullYear(year,month-1,dayCount); 
                }

                dayCount++
            }
        }
        calendarHtml += '</tr>'
    }
    calendarHtml += '</table>'

    

    return calendarHtml
}

function moveCalendar(e) { //カレンダー移動ボタンの関数
    document.querySelector('#calendar').innerHTML = ''

    if (e.target.id === 'prev') {
        month--

        if (month < 1) {
            year--
            month = 12
        }
    }

    if (e.target.id === 'next') {
        month++

        if (month > 12) {
            year++
            month = 1
        }
    }

    showCalendar(year, month);
}

function Holiday(year,month,calenderDate) {// 日本の祝祭日を取得する関数
    date.setFullYear(year,month,calenderDate); //monthは0-11なので注意
    // 祝祭日かどうか判定
    if(date.isHoliday()){
        console.log(date.getHoliday());
        return date.getHoliday();
    }
}

document.querySelector('#prev').addEventListener('click', moveCalendar)
document.querySelector('#next').addEventListener('click', moveCalendar)

showCalendar(year, month)

// 今日の日付を取得して、強調表示する。
let today = new Date();
let id = '#td'+ today.getDate(); 
document.querySelector(id).className += " enhance";