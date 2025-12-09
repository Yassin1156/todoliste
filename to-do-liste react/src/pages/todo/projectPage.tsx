import type { ProjectPageProps, FilterKey } from "../../types";
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
import api from "../../api/client";

export function ProjectPage({
  setIsSidebarOpen,
  isSidebarOpen,
  setIsProjectSelected,
  currentProjectIndex,
  setCurrentProjectIndex,
  projects,
  setProjects,
  userName,
  onLogout,
}: ProjectPageProps) {
  const [todoText, setTodoText] = useState<string>("");
  const [isTimeWindowOpem, setIsTimeWindowOpen] = useState<boolean>(false);
  const [hours, setHours] = useState<string>("");
  const [minutes, setMinutes] = useState<string>("");
  const [now, setNow] = useState(dayjs());
  const [isShareWindowOpen, setIsShareWindowOpen] = useState<boolean>(false);
  const [isFilterWindowOpen, setIsFilterWindowOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<FilterKey>("alle");
  const [todos, setTodos] = useState<
    { id: string; content: string; done: boolean; deadline: string }[]
  >([]);

//  const currentAccount = accounts[currentAccountIndex];
  // const projects = currentAccount ? currentAccount.projects : [];
 // const accountProjects = currentAccount ? currentAccount.projects : [];
 // const todos = accountProjects[currentProjectIndex]?.todos ?? [];

  //const todos = projects[currentProjectIndex].todos;
  const navigate = useNavigate();
  const { id } = useParams();
  const shareLink = id
    ? `${window.location.origin}/todo/${id}`
    : window.location.href;

  useEffect(() => {
    async function fetchTodos() {
      try {
        const res = await api.get("/todos", {
          params: { projectId: id },
        });
        setTodos(res.data);
      } catch (error) {
        console.error("Fehler beim Laden der Todos:", error);
      }
    }
    fetchTodos();
  }, [id]);
 

  useEffect(() => {
    const id = setInterval(() => setNow(dayjs()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!id) return;
    const index = projects.findIndex((p) => p.id === id);
    if (index >= 0) setCurrentProjectIndex(index);
  }, [id, projects, setCurrentProjectIndex]);

  const addTodo = async () => {
    const deadline = dayjs()
      .add(Number(hours), "hour")
      .add(Number(minutes), "minute");
    try {
      const res = await api.post("/todos", {
        content: todoText,
        projectId: id,
        deadline
      });
      const newTodo = res.data;
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      console.log("Todo hinzugefügt:", newTodo);
    } catch (error) {
      console.error("Fehler beim Hinzufügen des Todos:", error);
    }


    setTodoText("");
    setIsTimeWindowOpen(false);
  };

  const toggleTodoDone = async (todoId: string) => {
    try {
      const todo = todos.find((t) => t.id === todoId);
      if (!todo) return;

      const res = await api.put(`/todos/${todoId}`, {
        done: !todo.done,
      });
      const updatedTodo = res.data;
      setTodos((prevTodos) =>
        prevTodos.map((t) => (t.id === todoId ? updatedTodo : t))
      );
      console.log("Todo aktualisiert:", updatedTodo);
    } catch (error) {
      console.error("Fehler beim Aktualisieren des Todos:", error);
    }
  };

  const deleteTodo = async (todoId: string) => {
      try {
      await api.delete(`/todos/${todoId}`);
      setTodos((prevTodos) => prevTodos.filter((t) => t.id !== todoId));
      console.log("Todo gelöscht:", todoId);
    } catch (error) {
      console.error("Fehler beim Löschen des Todos:", error);
    }
  };

  const deleteProject = async () => {
    const poject = projects[currentProjectIndex];
    try {
      await api.delete(`/projects/${poject.id}`);
      setProjects((prevProjects) =>
        prevProjects.filter((p) => p.id !== poject.id)
      );
      setIsProjectSelected(false);
      setCurrentProjectIndex(0);
      navigate("/todo");
      console.log("Projekt gelöscht:", poject);
    } catch (error) {
      console.error("Fehler beim Löschen des Projekts:", error);
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (selected === "alle") return true;
    if (selected === "erledigt") return todo.done;
    if (selected === "nichterledigt") return !todo.done;
    if (selected === "faellig") {
      const diffMin = dayjs(todo.deadline).diff(now, "minute");
      return diffMin <= 0;
    }
    return true;
  });

  return (
    <>
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />

      <title>Project Page</title>

      <Sidebar
        projects={projects}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        userName={userName}
        onLogout={onLogout}
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

      <FilterWindow
        isFilterWindowOpen={isFilterWindowOpen}
        setIsFilterWindowOpen={setIsFilterWindowOpen}
        selected={selected}
        setSelected={setSelected}
      />

      <div className={`Todo ${isSidebarOpen ? "" : "back"}`}>
        <div className="Todo-Header">
          <div className="header-row">
            <h1>
              {projects[currentProjectIndex]?.name ?? "Projekt wird geladen..."}
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
              {filteredTodos.map((todo) => {
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
        projectId={projects[currentProjectIndex]?.id}
      />
    </>
  );
}
