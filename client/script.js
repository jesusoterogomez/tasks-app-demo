// Some useful functions that we will use across the app

// ---------------------------------
// FUNCTIONS TO CALL THE BACKEND API
// ---------------------------------

/**
 * Gets the tasks from the API using a GET request
 *
 * We still haven't learned about a lot of this syntax,
 * but "fetch" is a built-in function that allows us to make HTTP requests
 * async and await are keywords in JS that help us with "asynchronous" code
 * (things that take time, like network requests)
 *
 * If you want to know more:
 * (This is advanced, so you don't have to worry about it for now)
 * - https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
 * - https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Introducing
 */
async function listAllTasks() {
  // Make a GET request to our server.
  const response = await fetch("http://127.0.0.1:4000/tasks");
  // Get the data from the JSON response and store it in a variable
  const tasks = await response.json();

  // For each of the tasks, add a list item to the task list
  // (calling the addTaskToList function for that)
  for (let i = 0; i < tasks.length; i++) {
    addTaskToList(tasks[i]);
  }
}

/**
 * Takes a parameter called `taskName` and makes a POST HTTP
 * request to our server to create a new task with that name.
 *
 * Then returns the response from the server.
 */
async function createTask(taskName) {
  // Return once the request is complete
  const response = await fetch("http://127.0.0.1:4000/tasks", {
    // It's a POST request this time
    method: "POST",
    // Specify the content type of this request is JSON
    headers: {
      "Content-Type": "application/json",
    },
    // Send a request with data to create a new task.
    // { name: taskName } is a JS object that we convert to a JSON string.
    body: JSON.stringify({ name: taskName }),
  });

  // Extract the new task data from the server response
  const taskDataFromServer = await response.json();

  // Return it from this function so it can be used in other parts of the code.
  return taskDataFromServer;
}

// ----------------------------------------
// FUNCTIONS TO MANIPULATE THE HTML CONTENT
// ----------------------------------------

// Add a task to the list in the HTML content
function addTaskToList(taskData) {
  // Find the task list in the HTML content
  const taskList = document.getElementById("task-list");

  // Create a new list element
  const listElement = document.createElement("li");

  // Set the text content of the list element to the task name
  listElement.textContent = taskData.name;

  // Add the list element to the task list
  taskList.appendChild(listElement);
}

// ----------------------------
// EVENT LISTENERS
// ----------------------------

// When the page loads, get the list of tasks from the API and show them.
window.addEventListener("load", () => {
  listAllTasks();
});

// When the "Create Task" button is clicked, create a new task
document
  .getElementById("create-task-button")
  .addEventListener("click", async function () {
    // Get the task name from the text field.
    const taskNameInput = document.getElementById("task-title");
    const taskName = taskNameInput.value;

    // Create the new task using the API
    const newTaskFromServer = await createTask(taskName);

    // Add the new task to the list using the `addTaskToList` function
    addTaskToList(newTaskFromServer);

    // Clear the input field so the user can type a new task
    taskNameInput.value = "";
  });
