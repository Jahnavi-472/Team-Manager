let tasks = JSON.parse(localStorage.getItem("tasks")) || [
  { name: "Task 1", completed: false },
  { name: "Task 2", completed: false },
  { name: "Task 3", completed: true }
];

let currentRole = "";

// LOGIN
function login() {
  const username = document.getElementById("username").value;
  currentRole = document.getElementById("role").value;

  if (username === "") {
    alert("Enter username");
    return;
  }

  document.getElementById("loginCard").classList.add("hidden");
  document.getElementById("dashboard").classList.remove("hidden");
  document.getElementById("taskSection").classList.remove("hidden");

  if (currentRole === "admin") {
    document.getElementById("taskForm").classList.remove("hidden");
  }

  renderTasks();
}

// ADD TASK
function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value;

  if (text === "") return;

  tasks.push({ name: text, completed: false });
  input.value = "";

  saveTasks();
}

// SAVE + RENDER
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// RENDER TASKS
function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  let completedCount = 0;

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span onclick="toggleTask(${index})" 
        class="${task.completed ? 'completed' : ''}">
        ${task.name}
      </span>
      <div>
        <button onclick="toggleTask(${index})">✔</button>
        <button onclick="deleteTask(${index})">❌</button>
      </div>
    `;

    if (task.completed) completedCount++;

    list.appendChild(li);
  });

  document.getElementById("total").innerText = tasks.length;
  document.getElementById("completed").innerText = completedCount;
  document.getElementById("pending").innerText = tasks.length - completedCount;
}

// TOGGLE
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
}

// DELETE
function deleteTask(index) {
  if (confirm("Delete task?")) {
    tasks.splice(index, 1);
    saveTasks();
  }
}