//Sets the current date to appear at the top of the page.
const DateTime = luxon.DateTime;
let today = DateTime.local().toLocaleString(DateTime.DATE_HUGE);
console.log(today);
let date = document.querySelector("#currentDay");

date.textContent = today;

//Logs the hour of the day
let hour = DateTime.local().hour;
console.log(hour)

//Sets the appropriate color for each timeblock
function timeTracker() {
    for (let i = 9; i < 18; i++) {
        if (i < hour) {
            document.getElementById('color').id = 'past'
        };
        if (i == hour) {
            document.getElementById('color').id = 'present'
        }
        if (i > hour) {
            document.getElementById('color').id = 'future'
        }
    }
}
//Runs timeblock color function
timeTracker();


var allSaveButtons = document.querySelectorAll(".saveBtn");

allSaveButtons.forEach(function (btn) {
    btn.addEventListener("click", function (event) {
        //when each button is clicked, preceeding line is saved to local storage.

        //get data hour
        var hour = event.target.parentElement.getAttribute("data");
        //get text input
        var text = event.target.parentElement.children[1].value;
        //get local data if there is local data
        var data = JSON.parse(localStorage.getItem("tasks")) || [];
        //filter the data
        const filteredData = data.filter(function (datum) {
            if (datum.hour !== hour) {
                return true
            }
            return false
        });
        //construct new data entry obj
        var entry = {
            hour: hour,
            text: text
        }
        //add this new entry into existing local data
        filteredData.push(entry);
        //overwrite local storgae with updated data
        localStorage.setItem("tasks", JSON.stringify(filteredData));
    });
});

//get local data if there is local data
var data = JSON.parse(localStorage.getItem("tasks")) || [];

//displays each hours text on load of page
data.forEach(function (datum) {
    var query = `[data="${datum.hour}"]`;
    document.querySelector(query).children[1].value = datum.text;
})