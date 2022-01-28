#! /usr/bin/env node
const { program } = require("commander");

const {
  add,
  show,
  deleteTask,
  updateTask,
  deleteAll,
  allCompleted,
} = require("./commands");

program.command("add").description("Add new TODO Task").action(add);

program
  .command("remove")
  .description("Remove a particular task selected from list")
  .action(deleteTask);

program
  .command("show")
  .description("View all the tasks and it's status of completion")
  .action(show);

program
  .command("mark-completed")
  .description(
    "It marks the status of a selected task as completed and vice-versa"
  )
  .action(updateTask);

program
  .command("delete-all")
  .description("Delete all the tasks from the list")
  .action(deleteAll);
program
  .command("complete-all")
  .description("Mark all the tasks as completed")
  .action(allCompleted);
program.parse();
