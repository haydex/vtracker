let datePickerElement = document.getElementById('newdatepicker')
let options = { year: 'numeric', month: 'short', day: 'numeric' };

let date = new Date()
let defaultDate = date.toLocaleDateString("en-US", options)
let nextDefaultDate = new Date();
let numberOfDaysToAdd = 3;
nextDefaultDate.setDate(nextDefaultDate.getDate() + numberOfDaysToAdd);


datePickerElement.innerText = `${defaultDate} - ${nextDefaultDate.toLocaleDateString("en-US", options)}`

const picker = new Litepicker({
    element: document.getElementById('newdatepicker'),
    singleMode: false,
    tooltipNumber: (totalDays) => {
        return totalDays - 1;
    },
    setup: (picker) => {
        picker.on('selected', (date1, date2) => {
            newdatepicker.innerText = `${date1.dateInstance.toLocaleDateString("en-US", options)} - ${date2.dateInstance.toLocaleDateString("en-US", options)}`
        });
    },
})