import type { TodoPageProps } from "../../types";
import { Sidebar } from "./Sidebar";
import { useState } from "react";
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

  const currentAccount = accounts[currentAccountIndex];
  const projects = currentAccount ? currentAccount.projects : [];

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
          name: projectName,
          todos: [],
        });
        return updatedAccounts;
      });
      setCurrentProjectIndex(newIndex);
      console.log("Projekt erstellt");
    }
    setIsProjectSelected(true);
  };

  const addTodo = () => {
    setAccounts((account) => {
      const updatedAccounts = [...account];
      updatedAccounts[currentAccountIndex].projects[
        currentProjectIndex
      ].todos.push({
        content: todoText,
        id: crypto.randomUUID(),
        done: false,
      });
      return updatedAccounts;
    });
    setTodoText("");
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
    const updatedProjects = [...updatedAccounts[currentAccountIndex].projects];

    const updatedTodos = updatedProjects[currentProjectIndex].todos
      .filter((t) => t.id !== todoId);

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
      const updatedProjects = updatedAccounts[currentAccountIndex].projects
        .filter((_, index) => index !== currentProjectIndex);
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
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />

      <title>ToDo Page</title>

      <Sidebar currentAccount={currentAccount} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      <div className={`Todo ${isSidebarOpen ? ""  : "back"}`}>
        <div className="Todo-Header">
          {isProjectSelected ? (
            <div className="header-row">
              <h1>
                {projects[currentProjectIndex].name}
                <button className="wechsel-button" onClick={() => setIsProjectSelected(false)}>
                  Projekt wechseln
                </button>
                <button onClick={
                  deleteProject
                }>Projekt löschen</button>
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
              <button className="addProject-button" onClick={addProject}>+</button>
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
                <button onClick={addTodo}>+</button>
              </div>
              <div className="Todo-list">
                {projects[currentProjectIndex].todos.map((todo) => (
                  <div key={todo.id} className="Todo-item">
                    <ul>
                      <li>
                        <input
                          type="checkbox"
                          checked={todo.done}
                          onChange={() => toggleTodoDone(todo.id)}
                        />
                        {todo.content}
                        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
              <button className="share-button"><span className="material-icons">share</span></button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
