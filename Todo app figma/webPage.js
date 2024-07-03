
let out = document.getElementById("logout");

out.addEventListener("click", () => {
    // webSection.style.display = "none";
    // container.style.display = "block";
    window.location.href='login.html'
});

// New task page


function setUpTaskManagement() {
    let add = document.getElementById("addTask");

    add.addEventListener("click", (event) => {
        event.preventDefault();
        let over = document.getElementById("overlay");
        let NewTask = document.getElementById("newTask");
        over.style.display = "block";
        NewTask.style.display = "flex";

        // Cancel button

        let del = document.getElementById("cancel");
        del.addEventListener("click", () => {
            NewTask.style.display = "none";
            over.style.display = "none";
        });
      
        // loadData();
        // let tasks = document.querySelectorAll('#incomp li');
        // tasks.forEach((task) => {
        //     scheduleNotification(task);
        // });

    });
}
// Save data
function saveData() {
    let com = document.getElementById("comp");
    let incom = document.getElementById("incomp");
    localStorage.setItem("comData", com.innerHTML);
    localStorage.setItem("incomData", incom.innerHTML);
  

}
// Load data
function loadData() {
    let com = document.getElementById("comp");
    let incom = document.getElementById("incomp");
    com.innerHTML = localStorage.getItem("comData") || "";
    incom.innerHTML = localStorage.getItem("incomData") || "";
   

   
}

function SetUpTaskBtn() {
    document.getElementById("save").addEventListener("click", () => {
        let description = document.getElementById("description").value;
        let summary = document.getElementById("summary").value;
        let dueDate = document.getElementById("dueDate").value;

        if (!summary || !description || !dueDate) {
            alert("Please enter all details");
            return;
        }

        let date = moment(dueDate, "DD MMMM HH:mm");
        if (!date.isValid()) {
            alert("Invalid date format");
            return;
        }

        let formattedDate = date.format("DD MMMM HH:mm");

        if (date.isSame(moment(), "day")) {
            formattedDate = "Today, " + date.format("HH:mm");
        } else if (date.isSame(moment().add(1, "day"), "day")) {
            formattedDate = "Tomorrow, " + date.format("HH:mm");
        } else if (date.isSame(moment().subtract(1, "day"), "day")) {
            formattedDate = "Yesterday, " + date.format("HH:mm");
        }

        let incom = document.getElementById("incomp");



        let taskList = document.createElement("li");
        taskList.innerHTML = summary;
        let timeSpan = document.createElement("span");
        timeSpan.innerHTML = formattedDate;
        timeSpan.className = "timeSpan";
        timeSpan.style.display = "block";
        taskList.appendChild(document.createTextNode(""));
        taskList.appendChild(timeSpan);
        taskList.dataset.summary = summary;
        taskList.dataset.description = description;
        taskList.dataset.dueDate = date.toISOString();
        incom.appendChild(taskList);
        let NewTask = document.getElementById("newTask");
        let over = document.getElementById("overlay");
        NewTask.style.display = "none";
        over.style.display = "none";

        document.getElementById("description").value = "";
        document.getElementById("summary").value = "";
        document.getElementById("dueDate").value = "";
        saveData();
        scheduleNotification(taskList);

    });
}
// Move Task to Complete list
function checkAndMoveToIncomp() {
    let incom = document.getElementById("incomp");
    let com = document.getElementById("comp");
    let tasks = incom.getElementsByTagName("li");

    for (let task of tasks) {
        let taskElement = task;
        let dueDate = task.dataset.dueDate;
        let dueDateTime = moment(dueDate);
        let currentDateTime = moment();
        console.log('current Time:', currentDateTime);
        if (dueDateTime.isBefore(currentDateTime)) {

            let taskText = taskElement.textContent;
            let summary = taskText.replace(/(\d{2} \w+ \d{2}:\d{2}|today, \d{2}:\d{2}|yesterday, \d{2}:\d{2}|tomorrow, \d{2}:\d{2})/gi, '').trim();
            let newTaskItem = document.createElement("li");
            newTaskItem.textContent = summary;
            com.appendChild(newTaskItem);
            incom.removeChild(task);

            saveData();
        }
    }
}
let intervalID = setInterval(checkAndMoveToIncomp, 2000);

function showReminder(taskElement) {
    console.log('Task Element:', taskElement); // Log the entire taskElement to inspect its attributes
    console.log('Task Element Attributes:', taskElement.dataset);
    let reminder = document.getElementById('reminder');

    let dueDate = taskElement.dataset.dueDate;
    let dueDateTime = moment(dueDate);

    let currentDateTime = moment();
    console.log('Current date:', currentDateTime.format());
    if (dueDateTime.diff(currentDateTime, 'seconds') <= 60 && dueDateTime.diff(currentDateTime, 'seconds') >= 0) {
        reminder.style.display = 'block';
        console.log(taskElement.dataset.summary); // Check the value in the console
        console.log(taskElement.dataset.description);
        document.getElementById('summ').innerHTML = taskElement.dataset.summary;

        document.getElementById('des').innerHTML = taskElement.dataset.description;

        document.getElementById('skip').addEventListener('click', () => {
            reminder.style.display = "none";
        });
        document.getElementById('remind').addEventListener('click', () => {
            reminder.style.display = "none";
            setTimeout(() => {
                reminder.style.display = "block";

            }, 2000);
        });
    }
}

function scheduleNotification(taskElement) {
    let dueDate = taskElement.dataset.dueDate;
    let dueDateTime = moment(dueDate);
    let currentDateTime = moment();
    const timeDiff = dueDateTime.diff(currentDateTime);
    if (timeDiff > 0) {
        setTimeout(() => {
            showReminder(taskElement);
        }, timeDiff);
    }
}

let locBtn = document.getElementById("location");
let locPage = document.getElementById("location-page");
let section = document.getElementById("section");
locBtn.addEventListener("click", () => {
    // locPage.style.display = "block";
    // section.style.display = "none";
window.location.href='locPage.html';
});
loadData();
setUpTaskManagement();
SetUpTaskBtn();