const conf = new (require("conf"))();
const inquirer = require("inquirer");
const chalk = require("chalk");
var Table = require("cli-table");
const { up } = require("inquirer/lib/utils/readline");

async function add() {
  let list = getTasks();

  const input = await inquirer.prompt({
    name: "task",
    type: "input",
    message: "Enter a new task",
    default() {
      return null;
    },
  });
  if (input.task) {
    if (list.find((task) => task.name === input.task)) {
      console.log(chalk.red.bold("Task already exists"));
      return;
    }

    list.push({
      name: input.task,
      done: false,
      // key: Math.floor(Math.random() * 99999),
    });

    setTasks(list);
    console.log(chalk.green.bold("Task added successfully!"));
    show();
  } else {
    console.log(chalk.red.bold("Invalid task"));
  }
}

function show() {
  let todosList = getTasks();
  if (todosList.length == 0) {
    table = new Table();
    table.push(["Empty List"]);
    console.log(table.toString());
    return;
  }

  var table = new Table({
    head: ["Task", "Completed"],
  });
  todosList.forEach((todo) => {
    done = todo.done ? "✔" : "✖";

    table.push([todo.name, done.trim()]);
  });
  console.log(table.toString());
}

async function deleteTask() {
  tasks = getTasks();
  if (tasks.length == 0) {
    console.log(chalk.red.bold("Empty List \nNothing to remove!"));
    return;
  }

  const input = await inquirer.prompt({
    name: "task",
    type: "list",
    message: "Select a task to delete",
    choices: tasks,

    default() {
      return null;
    },
  });
  const confirm = await inquirer.prompt({
    name: "confirm",
    type: "confirm",
    message: "are you sure to delete this task?",
    default() {
      return "n";
    },
  });

  if (confirm.confirm) {
    setTasks(tasks.filter((task) => task.name != input.task));
    console.log(chalk.green.bold("Task deleted successfully!"));
    show();
  } else {
    console.log(chalk.red.bold("Operation cancelled! (Delete Task)"));
  }
}

async function updateTask() {
  tasks = getTasks();
  if (tasks.length == 0) {
    console.log(chalk.red.bold("Empty List \nNothing to Change!"));
    return;
  }

  const input = await inquirer.prompt({
    name: "task",
    type: "list",
    message: "Select a task to Update",
    choices: tasks,

    default() {
      return null;
    },
  });

  let update = tasks.find((task) => task.name === input.task);

  const confirm = await inquirer.prompt({
    name: "confirm",
    type: "confirm",
    message: `change "${update.name}" status to "${!update.done}" `,
    default() {
      return "n";
    },
  });

  if (confirm.confirm) {
    let index = tasks.indexOf(update);
    tasks[index].done = !update.done;
    setTasks(tasks);
    console.log(chalk.green.bold("Task updated ✔"));
    show();
  } else {
    console.log(chalk.red.bold("Operation cancelled ❌"));
  }
}

async function deleteAll() {
  if (getTasks().length == 0) {
    console.log(chalk.red.bold("Nothing to delete"));
    return;
  }
  show();
  const confirm = await inquirer.prompt({
    name: "confirm",
    type: "confirm",
    message: "Are you sure to delete all the above tasks?",
    default() {
      return "n";
    },
  });

  if (confirm.confirm) {
    setTasks([]);
    console.log(chalk.green.bold("All Tasks Cleared ✔"));
  } else {
    console.log(chalk.red.bold("Operation cancelled ✖"));
  }
}

async function allCompleted() {
  tasks = getTasks();
  if (tasks.length == 0) {
    console.log(chalk.red.bold("Nothing to Modify"));
    return;
  }
  show();
  const confirm = await inquirer.prompt({
    name: "confirm",
    type: "confirm",
    message: "Are you sure to mark all the above tasks as completed?",
    default() {
      return "n";
    },
  });

  if (confirm.confirm) {
    updated = tasks.map((task) => {
      task.done = true;
      return task;
    });
    setTasks(updated);
    console.log(chalk.green.bold("All Tasks marked as completed ✔"));
  } else {
    console.log(chalk.red.bold("Operation cancelled ✖"));
  }
}

function getTasks() {
  let tasks = conf.get("todo-list");
  if (!tasks) {
    return [];
  } else {
    return tasks;
  }
}
function setTasks(tasks) {
  conf.set("todo-list", tasks);
}
module.exports = { add, show, deleteTask, updateTask, deleteAll, allCompleted };
