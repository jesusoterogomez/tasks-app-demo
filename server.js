const { app, PORT } = require("./setup");

/**
 * Array to hold tasks
 * We don't have a database, so these disappear when you restart the server
 *
 * There are a couple of tasks already added as examples.
 */
const tasks = [
  {
    id: 0,
    name: "Buy groceries",
    isCompleted: false,
  },
  {
    id: 1,
    name: "Call my family",
    isCompleted: false,
  },
];

// ------------
//  ENDPOINTS
// ------------

// GET endpoint for returning the list of all available tasks.
app.get("/tasks", (request, response) => {
  // When the client requests all the tasks, we return our tasks array.
  // No database yet, so we only return the array as is.

  // Return a 200 HTTP code (OK) and the tasks array as JSON.
  return response.status(200).json(tasks);
});

// POST endpoint for creating a new task.
// It validates that the task is properly formed before adding it to the list.
app.post("/tasks", (request, response) => {
  // Get the client data from the body from JSON into a JS object.
  const taskData = request.body;

  // Basic validation: check that the task has a title, or that it's not empty.
  if (!taskData.name || taskData.name.trim() === "") {
    // Returning with a HTTP method 400 if there is a user error
    return response.status(400).json({
      error: "Task must have a title",
    });
  }

  // Create the new task
  const newTask = {
    id: tasks.length + 1, // Just an auto incrementing number. (This isn't good enough for production)
    name: taskData.name,
    isCompleted: false, // A newly created task isn't completed yet
  };

  // Push the new task to our tasks array
  tasks.push(newTask);

  // Respond with HTTP Code 201 (Created) with the new task that was just created as JSON.
  return response.status(201).json(newTask);
});

// Start the server, listening on PORT (4000)
app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
