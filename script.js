// script.js
//ChatGPTに制作させたもの

var monthNames = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
var daysOfWeek = ["日", "月", "火", "水", "木", "金", "土"];

function generateCalendar(year, month) {
  var calendarBody = document.getElementById("calendarBody");
  var currentMonthYear = document.getElementById("currentMonthYear");
  calendarBody.innerHTML = "";
  
  var date = new Date(year, month);
  var currentMonth = date.getMonth();
  var currentYear = date.getFullYear();
  
  currentMonthYear.textContent = monthNames[currentMonth] + " " + currentYear;
  
  var firstDay = new Date(currentYear, currentMonth, 1);
  var lastDay = new Date(currentYear, currentMonth + 1, 0);
  
  var week = document.createElement("tr");
  for (var i = 0; i < firstDay.getDay(); i++) {
    var dayCell = document.createElement("td");
    week.appendChild(dayCell);
  }
  
  for (var day = 1; day <= lastDay.getDate(); day++) {
    if (week.childElementCount === 7) {
      calendarBody.appendChild(week);
      week = document.createElement("tr");
    }
    
    var dayCell = document.createElement("td");
    dayCell.textContent = day;
    if (currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear() && day === new Date().getDate()) {
      dayCell.classList.add("current-month");
    }
    week.appendChild(dayCell);
  }
  
  calendarBody.appendChild(week);
}

// 初期表示
var currentDate = new Date();
generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
