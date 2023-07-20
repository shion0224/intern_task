const weeks = ['日', '月', '火', '水', '木', '金', '土']
const date = new Date() //Dateインスタンスを作成。
const year = date.getFullYear() //現在の年を取得
const month = date.getMonth() + 1 //0-11で現在の月を取得
const endDate = new Date(year, month,  0) // 月の最後の日を取得,この場合yyyy/mm/ddになる
const startDate = new Date(year, month - 1, 1) // 月の最初の日を取得,この場合yyyy/mm/ddになる
const endDayCount = endDate.getDate() // 月の末日を"日"のみ取得
const startDay = startDate.getDay() // 月の最初の日の曜日を取得,0-6で取得
let dayCount = 1 // 日にちのカウント
let calendarHtml = '' // HTMLを組み立てる変数

calendarHtml += '<h1>' + year  + '/' + month + '</h1>'
calendarHtml += '<table>'

// 曜日の行を作成
//ここに<tr>をいれなくていい？曜日の行はなぜかできている。
for (let i = 0; i < weeks.length; i++) {
    calendarHtml += '<td>' + weeks[i] + '</td>' //tableのセルを作成。
}

for (let w = 0; w < 6; w++) {
    calendarHtml += '<tr>'

    for (let d = 0; d < 7; d++) {
        if (w == 0 && d < startDay) { //1番目の処理
            // 1行目で1日の曜日の前
            calendarHtml += '<td></td>'
        } else if (dayCount > endDayCount) { //3番目の処理
            // 末尾の日数を超えた
            calendarHtml += '<td></td>'
        } else { //2番目の処理
            calendarHtml += '<td>' + dayCount + '</td>'
            dayCount++
        }
    }
    calendarHtml += '</tr>'
}
calendarHtml += '</table>'

document.querySelector('#calendar').innerHTML = calendarHtml