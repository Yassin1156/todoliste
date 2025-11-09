import type { ProjectPageProps } from "../../types";
import { Sidebar } from "./Sidebar";
import { SetTimeWindow } from "./setTimeWindow";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);
import { ShareWindow } from "./shareWindow";
import "./todoPage.css";
import { useNavigate, useParams } from "react-router-dom";
import { FilterWindow } from "./filterWindow";

export function ProjectPage({
  accounts,
  currentAccountIndex,
  setAccounts,
  setIsSidebarOpen,
  isSidebarOpen,
  setIsProjectSelected,
  currentProjectIndex,
  setCurrentProjectIndex,
}: ProjectPageProps) {
  const [todoText, setTodoText] = useState<string>("");
  const [isTimeWindowOpem, setIsTimeWindowOpen] = useState<boolean>(false);
  const [hours, setHours] = useState<string>("");
  const [minutes, setMinutes] = useState<string>("");
  const [now, setNow] = useState(dayjs());
  const [isShareWindowOpen, setIsShareWindowOpen] = useState<boolean>(false);
  const [isFilterWindowOpen, setIsFilterWindowOpen] = useState<boolean>(false);

  const currentAccount = accounts[currentAccountIndex];
  const projects = currentAccount ? currentAccount.projects : [];
  const navigate = useNavigate();
  const { id } = useParams();
  const shareLink = id
    ? `${window.location.origin}/todo/${id}`
    : window.location.href;

  useEffect(() => {
    const id = setInterval(() => setNow(dayjs()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!id) return;
    const index = projects.findIndex((p) => p.id === id);
    if (index >= 0) setCurrentProjectIndex(index);
  }, [id, projects, setCurrentProjectIndex]);

  const addTodo = () => {
    const deadline = dayjs()
      .add(Number(hours), "hour")
      .add(Number(minutes), "minute");
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
    setCurrentProjectIndex(0);
    navigate("/todo");
    console.log("Projekt gelöscht");
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />

      <title>Project Page</title>

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

      <FilterWindow isFilterWindowOpen={isFilterWindowOpen} setIsFilterWindowOpen={setIsFilterWindowOpen} />

      <div className={`Todo ${isSidebarOpen ? "" : "back"}`}>
        <div className="Todo-Header">
          <div className="header-row">
            <h1>
              {projects[currentProjectIndex].name}
              <button
                className="wechsel-button"
                onClick={() => {
                  setIsProjectSelected(false);
                  navigate("/todo");
                }}
              >
                Projekt wechseln
              </button>
              <button onClick={deleteProject}>Projekt löschen</button>
            </h1>
          </div>
        </div>

        <div className="Todo-Content">
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
            <div className="filter">
              <button onClick={() => setIsFilterWindowOpen(true)}>
                <span className="material-icons">filter_list</span>
              </button>
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
              className="share-button"
            >
              <span className="material-icons">share</span>
            </button>
          </div>
        </div>
      </div>
      <ShareWindow
        isShareWindowOpen={isShareWindowOpen}
        setIsShareWindowOpen={setIsShareWindowOpen}
        shareLink={shareLink}
      />
    </>
  );
}
