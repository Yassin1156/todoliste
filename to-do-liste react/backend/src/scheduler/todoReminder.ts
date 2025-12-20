import dayjs from "dayjs";
import { Todo } from "../models/todo";
import { Project } from "../models/project";
import { sendPushToAccount } from "../push/sendPush";

export function startTodoReminderScheduler() {
  console.log("⏰ Todo Reminder Scheduler gestartet");

  setInterval(async () => {
    const now = new Date();

    const todos = await Todo.find({
      deadline: { $lte: now },
      done: false,
      reminded: false,
    });

    for (const todo of todos) {
      const project = await Project.findOne({ id: todo.projectId });
      if (!project) continue;

      const payload = {
        title: "⏰ Todo fällig",
        body: todo.content,
        url: `http://localhost:5173/todo/${project.id}`,
      };

      // 🔔 Owner
      await sendPushToAccount(project.accountId, payload);

      // 🔔 Shared Users
      if (Array.isArray(project.sharedWith)) {
        for (const accountId of project.sharedWith) {
          await sendPushToAccount(accountId, payload);
        }
      }

      // markieren, damit nicht erneut gepusht wird
      todo.reminded = true;
      await todo.save();
    }
  }, 30_000); // alle 30 Sekunden
}
