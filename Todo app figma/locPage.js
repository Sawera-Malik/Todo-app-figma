// Event listeners for navigation buttons
let locBtn = document.getElementById("location");
locBtn.addEventListener("click", () => {
  window.location.href = "locPage.html";
});

let taskBtn = document.getElementById("task");
taskBtn.addEventListener("click", () => {
  window.location.href = "webPage.html";
});

let out = document.getElementById("logout");
out.addEventListener("click", () => {
  window.location.href = "login.html";
});

// Function to save taskData to localStorage
function saveData() {
  let loc = document.getElementById("current");
  let preLoc = document.getElementById("previous");
  localStorage.setItem("locData", loc.innerHTML);
  localStorage.setItem("preLocData", preLoc.innerHTML);
}

// Function to load taskData from localStorage
function loadData() {
  let loc = document.getElementById("current");
  let preLoc = document.getElementById("previous");
  loc.innerHTML = localStorage.getItem("locData") || "";
  preLoc.innerHTML = localStorage.getItem("preLocData") || "";
}

// Function to render tasks based on taskData
function renderTasks() {
  let currentList = document.getElementById("current");
  let preList = document.getElementById("previous");

  currentList.innerHTML = "";
  preList.innerHTML = "";

  taskData.forEach((task) => {
    let taskElement = createTaskElement(task.location, task.direction);
    if (task.isPrevious) {
      preList.appendChild(taskElement);
    } else {
      currentList.appendChild(taskElement);
    }
  });
  saveData();
}

// Function to create a task element
function createTaskElement(location, direction) {
  let taskElement = document.createElement("li");
  taskElement.innerHTML = location;

  let locSpan = document.createElement("span");
  locSpan.innerHTML = direction;
  locSpan.className = "locSpan";
  locSpan.style.display = "block";

  taskElement.appendChild(document.createTextNode(""));
  taskElement.appendChild(locSpan);

  moveToPrevious(taskElement);

  return taskElement;
}

// Function to add a new task to currentList
function AddTaskToList() {
  document.getElementById("addLoc").addEventListener("click", () => {
    let loc = prompt("Enter a location");
    let spanLoc = prompt("Enter direction");
    if (!loc || !spanLoc) {
      alert("Please enter all details");
      return;
    }

    // Move current task to previous list if current list has a task
    let currentList = document.getElementById("current");
    if (currentList.childNodes.length > 0) {
      let currentTaskElement = currentList.childNodes[0];
      moveToPrevious(currentTaskElement);
      saveData();
    }

    // Add the new task to current list
    let locList = createTaskElement(loc, spanLoc);
    currentList.appendChild(locList);

    // Update taskData with the new task
    let task = { location: loc, direction: spanLoc, isPrevious: false };
    taskData.push(task);
    console.log("Task added to taskData:", taskData);
    // Save updated taskData to localStorage
    saveData();
  });
}

// Function to move a task to previousList
function moveToPrevious(taskElement) {
  let preList = document.getElementById("previous");
  let currentList = document.getElementById("current");

  // Move taskElement to previousList
  preList.appendChild(taskElement);
  let location = taskElement.textContent;
  let direction = taskElement.textContent;
  let taskIndex = taskData.findIndex(
    (task) => task.location === location && task.direction === direction
  );
  if (taskIndex !== -1) {
    taskData[taskIndex].isPrevious = true;
    console.log("Task moved to previous:", taskData[taskIndex]);
    saveData();
  }
}
loadData();
AddTaskToList();
