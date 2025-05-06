let tasks = [];
    let taskIdCounter = 0;

    // Add a new task to the list
    function addTask(event) {
      event.preventDefault(); // Prevent form submission from refreshing the page
      const taskInput = document.getElementById("taskInput");
      const taskName = taskInput.value.trim();

      if (taskName) {
        tasks.push({
          id: taskIdCounter++,
          name: taskName,
          isDone: false,
        });
        taskInput.value = null; // Clear input field
        renderTasks();
        // Show success alert for adding task
        Swal.fire({
          icon: "success",
          title: "Task Added!",
          text: `The "${taskName}" was added successfully.`,
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        // Show warning if input is empty
        Swal.fire({
          icon: "warning",
          title: "Error",
          text: "Please enter a task before adding.",
          confirmButtonText: "OK",
        });
      }
    }

    // Render the task list in the DOM
    function renderTasks() {
      const taskList = document.getElementById("taskList");
      taskList.innerHTML = null; // Clear existing list

      tasks.forEach((task) => {
        const listItem = document.createElement("li");
        listItem.className = "d-flex justify-content-between rounded border-bottom my-3 py-2";
        listItem.innerHTML = `
          <span class="task-name">${task.name}</span>
          <div class="d-flex align-items-center gap-4">
            <button class="btn btn-outline-primary mx-5" onclick="toggleTask(${task.id})">
              ${task.isDone ? "Undo" : "Done"}
            </button>
            <button class="btn btn-outline-danger" onclick="deleteTask(${task.id})">
              Delete
            </button>
          </div>
        `;
        if (task.isDone) {
          listItem.style.textDecoration = "line-through";
        }
        taskList.appendChild(listItem);
      });
    }

    // Toggle task completion status
    function toggleTask(taskId) {
      const task = tasks.find((t) => t.id === taskId);
      if (task) {
        task.isDone = !task.isDone;
        renderTasks();
        // Show alert for toggling task
        Swal.fire({
          icon: "info",
          title: task.isDone ? "Task Completed!" : "Task Reverted!",
          text: `The task "${task.name}" has been ${task.isDone ? "marked as done" : "reverted to incomplete"}.`,
          timer: 1500,
          showConfirmButton: false,
        });
      }
    }

    // Delete a task by ID
    async function deleteTask(taskId) {
      const task = tasks.find((t) => t.id === taskId);
      if (task) {
        // Show confirmation dialog before deletion
        const result = await Swal.fire({
          icon: "question",
          title: "Are you sure?",
          text: `Do you want to delete the "${task.name}"?`,
          showCancelButton: true,
          confirmButtonText: "Yes, delete",
          cancelButtonText: "Cancel",
        });

        if (result.isConfirmed) {
          tasks = tasks.filter((t) => t.id !== taskId);
          renderTasks();
          // Show success alert for deletion
          Swal.fire({
            icon: "success",
            title: "Task Deleted!",
            text: `The task "${task.name}" was deleted successfully.`,
            timer: 1500,
            showConfirmButton: false,
          });
        }
      }
    }

    // Check if all tasks are done every 10 seconds
    // setInterval(() => {
    //   const allTasksDone = tasks.length > 0 && tasks.every((task) => task.isDone);
    //   if (allTasksDone) {
    //     Swal.fire({
    //       icon: "success",
    //       title: "Great Job!",
    //       text: "All tasks have been completed!",
    //       confirmButtonText: "OK",
    //     });
        
    //   }
    // }, 10000);