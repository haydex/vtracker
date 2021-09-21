let datePickerBtn = document.querySelector("#dateRange")
let calender = document.querySelector("#datePicker")
let monthDisplay = document.querySelector("#monthYear")
let yearDisplay = document.querySelector("#theYear")
let nextMonthButton = document.querySelector("#arrowRight")
let prevMonthButton = document.querySelector("#arrowLeft")
let daysContainer = document.querySelector("#days");


let date = new Date()
let day = date.getDate()
let month = date.getMonth()
let year = date.getFullYear()

let allMonths = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

// default value for selected date
let selectedDay = day
let selectedMonth = month
let selectedYear = year

monthDisplay.innerText = allMonths[month]
yearDisplay.innerText = year



// event listeners
datePickerBtn.addEventListener('click', toggleCalender)
nextMonthButton.addEventListener('click', goToNextMonth)
prevMonthButton.addEventListener('click', goToPrevMonth)



// functions
function toggleCalender(e) {
    calender.classList.toggle("displayDate")
    populateCalender()
}


async function populateCalender() {
    daysContainer.innerHTML=''
    let amountOfDays;

    if (month == 1 && (year % 4 == 0)) {
        amountOfDays = 29
    }
    else if (month == 1) {
        amountOfDays = 28
    } else if (month == 3 || 5 || 8 || 10) {
        amountOfDays = 30
    } else {
        amountOfDays = 31
    }

    for (let i = 0; i < amountOfDays; i++) {
        const dayElement = document.createElement('li');
        dayElement.textContent = i + 1
        daysContainer.appendChild(dayElement)
    }
}

function goToNextMonth(){
    month++;
    if(month > 11){
        month = 0;
        year++
    }
    monthDisplay.innerText = allMonths[month]
    yearDisplay.innerText = year
    populateCalender()
}

function goToPrevMonth(){
    month--;
    if(month < 0){
        month = 11;
        year--
    }
    monthDisplay.innerText = allMonths[month]
    yearDisplay.innerText = year
    populateCalender()
}
