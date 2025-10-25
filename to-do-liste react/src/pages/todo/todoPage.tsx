import type { TodoPageProps } from "../../types";
import { Sidebar } from "./Sidebar";
import { SetTimeWindow } from "./setTimeWindow";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);
import { ShareWindow } from "./shareWindow";
import "./todoPage.css";


export function TodoPage({
  accounts,
  currentAccountIndex,
  setAccounts,
}: TodoPageProps) {
  const [projectName, setProjectName] = useState<string>("");
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [isProjectSelected, setIsProjectSelected] = useState(false);
  const [todoText, setTodoText] = useState<string>("");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [isTimeWindowOpem, setIsTimeWindowOpen] = useState<boolean>(false);
  const [hours, setHours] = useState<string>("");
  const [minutes, setMinutes] = useState<string>("");
  const [now, setNow] = useState(dayjs());
  const [isShareWindowOpen, setIsShareWindowOpen] = useState<boolean>(false);

  const currentAccount = accounts[currentAccountIndex];
  const projects = currentAccount ? currentAccount.projects : [];

  useEffect(() => {
    const id = setInterval(() => setNow(dayjs()), 1000);
    return () => clearInterval(id);
  }, []);

  const addProject = () => {
    const projectIndex = projects.findIndex((p) => p.name === projectName);
    if (projectIndex >= 0) {
      setCurrentProjectIndex(projectIndex);
      console.log("Projekt ausgewählt");
    } else {
      const newIndex = projects.length;
      setAccounts((account) => {
        const updatedAccounts = [...account];
        updatedAccounts[currentAccountIndex].projects.push({
          id: crypto.randomUUID(),
          name: projectName,
          todos: []
        });
        return updatedAccounts;
      });
      setCurrentProjectIndex(newIndex);
      console.log("Projekt erstellt");
    }
    setIsProjectSelected(true);
  };

  const addTodo = () => {
    const deadline = dayjs().add(Number(hours), "hour").add(Number(minutes), "minute");
    setAccounts((account) => {
      const updatedAccounts = [...account];
      updatedAccounts[currentAccountIndex].projects[
        currentProjectIndex
      ].todos.push({
        content: todoText,
        id: crypto.randomUUID(),
        done: false,
        deadline: deadline.toISOString(),
      });
      return updatedAccounts;
    });
    setTodoText("");
    setIsTimeWindowOpen(false);
    console.log("Todo hinzugefügt");
  };

  const toggleTodoDone = (todoId: string) => {
    setAccounts((account) => {
      const updatedAccounts = [...account];
      const updatedProjects = [
        ...updatedAccounts[currentAccountIndex].projects,
      ];
      const updatedTodos = [...updatedProjects[currentProjectIndex].todos];

      const todoIndex = updatedTodos.findIndex((t) => t.id === todoId);
      if (todoIndex >= 0) {
        updatedTodos[todoIndex] = {
          ...updatedTodos[todoIndex],
          done: !updatedTodos[todoIndex].done,
        };
      }

      updatedProjects[currentProjectIndex] = {
        ...updatedProjects[currentProjectIndex],
        todos: updatedTodos,
      };

      updatedAccounts[currentAccountIndex] = {
        ...updatedAccounts[currentAccountIndex],
        projects: updatedProjects,
      };

      return updatedAccounts;
    });
  };

  const deleteTodo = (todoId: string) => {
    setAccounts((account) => {
      const updatedAccounts = [...account];
      const updatedProjects = [
        ...updatedAccounts[currentAccountIndex].projects,
      ];

      const updatedTodos = updatedProjects[currentProjectIndex].todos.filter(
        (t) => t.id !== todoId
      );

      updatedProjects[currentProjectIndex] = {
        ...updatedProjects[currentProjectIndex],
        todos: updatedTodos,
      };

      updatedAccounts[currentAccountIndex] = {
        ...updatedAccounts[currentAccountIndex],
        projects: updatedProjects,
      };

      return updatedAccounts;
    });
  };

  const deleteProject = () => {
    setAccounts((account) => {
      const updatedAccounts = [...account];
      const updatedProjects = updatedAccounts[
        currentAccountIndex
      ].projects.filter((_, index) => index !== currentProjectIndex);
      updatedAccounts[currentAccountIndex] = {
        ...updatedAccounts[currentAccountIndex],
        projects: updatedProjects,
      };
      return updatedAccounts;
    });
    setIsProjectSelected(false);
    setProjectName("");
    setCurrentProjectIndex(0);
    console.log("Projekt gelöscht");
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />

      <title>ToDo Page</title>

      <Sidebar
        currentAccount={currentAccount}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <SetTimeWindow
        isTimeWindowOpem={isTimeWindowOpem}
        setIsTimeWindowOpen={setIsTimeWindowOpen}
        addTodo={addTodo}
        hours={hours}
        setHours={setHours}
        minutes={minutes}
        setMinutes={setMinutes}
      />

      <div className={`Todo ${isSidebarOpen ? "" : "back"}`}>
        <div className="Todo-Header">
          {isProjectSelected ? (
            <div className="header-row">
              <h1>
                {projects[currentProjectIndex].name}
                <button
                  className="wechsel-button"
                  onClick={() => setIsProjectSelected(false)}
                >
                  Projekt wechseln
                </button>
                <button onClick={deleteProject}>Projekt löschen</button>
              </h1>
            </div>
          ) : (
            <h1>
              <input
                type="text"
                placeholder="Bitte geben sie den Projektnamen ein"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
              <button className="addProject-button" onClick={addProject}>
                +
              </button>
            </h1>
          )}
        </div>
        <div className="Todo-main">
          {isProjectSelected && (
            <div className="Todo-main">
              <div className="Todo-input">
                <input
                  type="text"
                  placeholder="Aufgabe eingeben"
                  value={todoText}
                  onChange={(e) => setTodoText(e.target.value)}
                />
                <button onClick={() => setIsTimeWindowOpen(true)}>+</button>
              </div>
              <div className="Todo-list">
                {projects[currentProjectIndex].todos.map((todo) => {
                  const deadline = dayjs(todo.deadline);
                  const remainingTime = deadline.diff(now);
                  const remainingDuration = dayjs.duration(remainingTime);
                  const remainingTimeString = `${remainingDuration.hours()}h ${remainingDuration.minutes()}m ${remainingDuration.seconds()}s`;
                  return (
                    <div key={todo.id} className="Todo-item">
                      <ul>
                        <li>
                          <input
                            type="checkbox"
                            checked={todo.done}
                            onChange={() => toggleTodoDone(todo.id)}
                          />
                          <text>{todo.content}</text>
                          {remainingTime > 0 ? remainingTimeString : "Abgelaufen"}
                          <button onClick={() => deleteTodo(todo.id)}>
                            Delete
                          </button>
                        </li>
                      </ul>
                    </div>
                  );
                })}
              </div>
              <button 
                onClick={() => setIsShareWindowOpen(true)}
                className="share-button">
                <span className="material-icons">share</span>
              </button>
            </div>
          )}
        </div>
      </div>
      <ShareWindow
        isShareWindowOpen={isShareWindowOpen}
        setIsShareWindowOpen={setIsShareWindowOpen}
      />
    </>
  );
}
