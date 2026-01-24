
import { Todo } from "../models/todo";
import { Project } from "../models/project";
import { sendPushToAccount } from "../push/sendPush";

export function startTodoReminderScheduler() {
  console.log("Todo Reminder Scheduler gestartet");

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
        title: "Todo fällig",
        body: todo.content,
        url: `http://localhost:5173/todo/${project.id}`,
      };

      // Für den Besitzer des Projekts
      await sendPushToAccount(project.accountId, payload);

      // Für geteilte Projekte
      if (Array.isArray(project.sharedWith)) {
        for (const accountId of project.sharedWith) {
          await sendPushToAccount(accountId, payload);
        }
      }

      //Fälliges Todo als erinnert markieren
      todo.reminded = true;
      await todo.save();
    }
  }, 30000); // Jede Sekunde wird geprüft, ob Todos fällig sind
}
