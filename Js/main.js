let tasks = [];
let taskIdCounter = 0;

// Add a new task
function addTask(event) {
  event.preventDefault();
  const taskInput = document.getElementById("taskInput");
  const taskName = taskInput.value.trim();

  if (taskName) {
    tasks.push({
      id: taskIdCounter++,
      name: taskName,
      isDone: false,
    });
    taskInput.value = null;
    renderTasks();
    Swal.fire({
      icon: "success",
      title: "Task Added!",
      text: `The"${taskName}" was added successfully.`,
      timer: 1500,
      showConfirmButton: false,
    });
  } else {
    Swal.fire({
      icon: "warning",
      title: "Error",
      text: "Please enter a task name first.",
      confirmButtonText: "OK",
    });
  }
}

// Render the task list
function renderTasks() {
  const taskList = document.getElementById("taskList");
  const deleteAllContainer = document.getElementById("deleteAllContainer");
  taskList.innerHTML = null;

  // If no tasks, show message and hide Delete All button
  if (tasks.length === 0) {
    taskList.innerHTML = `
      <li class="text-center text-muted py-3 list-unstyled">
        No tasks available, add a new task!
      </li>
    `;
    deleteAllContainer.style.display = "none";
  } else {
    // If there are tasks, show Delete All button and render tasks
    deleteAllContainer.style.display = "block";
    tasks.forEach((task) => {
      const listItem = document.createElement("li");
      listItem.className = "d-flex justify-content-between rounded border-bottom my-3 py-2";
      listItem.innerHTML = `
        <span class="task-name" style="${task.isDone ? 'text-decoration: line-through;' : ''}">${task.name}</span>
        <div class="d-flex align-items-center gap-4">
          <button class="btn btn-outline-success mx-5" onclick="toggleTask(${task.id})">
            ${task.isDone ? "Undo" : "Done"}
          </button>
          <button class="btn btn-outline-danger" onclick="deleteTask(${task.id})">
            Delete
          </button>
        </div>
      `;
      taskList.appendChild(listItem);
    });
  }
}

// Toggle task completion status
function toggleTask(taskId) {
  const task = tasks.find((t) => t.id === taskId);
  if (task) {
    task.isDone = !task.isDone;
    renderTasks();
    Swal.fire({
      icon: "info",
      title: task.isDone ? "Task Completed!" : "Task Reverted!",
      text: `The"${task.name}" has been ${task.isDone ? "marked as done" : "reverted to incomplete"}.`,
      timer: 1500,
      showConfirmButton: false,
    });
  }
}

// Delete a single task
async function deleteTask(taskId) {
  const task = tasks.find((t) => t.id === taskId);
  if (task) {
    const result = await Swal.fire({
      icon: "question",
      title: "Are you sure?",
      text: `Do you want to delete the task "${task.name}"?`,
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      tasks = tasks.filter((t) => t.id !== taskId);
      renderTasks();
      Swal.fire({
        icon: "success",
        title: "Task Deleted!",
        text: `The"${task.name}" was deleted successfully.`,
        timer: 1500,
        showConfirmButton: false,
      });
    }
  }
}

// Delete all tasks
async function deleteAllTasks() {
  const result = await Swal.fire({
    icon: "warning",
    title: "Are you sure?",
    text: "Do you want to delete all tasks? This action cannot be undone!",
    showCancelButton: true,
    confirmButtonText: "Yes, delete all",
    cancelButtonText: "Cancel",
  });

  if (result.isConfirmed) {
    tasks = [];
    taskIdCounter = 0;
    renderTasks();
    Swal.fire({
      icon: "success",
      title: "All Tasks Deleted!",
      text: "All tasks have been deleted successfully.",
      timer: 1500,
      showConfirmButton: false,
    });
  }
}
window.onload = function () {
  renderTasks(); // خلي renderTasks تتحكم في كل حاجة
};

