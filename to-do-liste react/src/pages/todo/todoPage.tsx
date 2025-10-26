import { Sidebar } from "./Sidebar";
import "./todoPage.css";
import { useState, useEffect } from "react";
import type { TodoPageProps } from "../../types";
import { useNavigate } from "react-router-dom";

export function TodoPage({
  accounts,
  currentAccountIndex,
  setAccounts,
  isSidebarOpen,
  setIsSidebarOpen,
  isProjectSelected,
  setIsProjectSelected,
  currentProjectIndex,
  setCurrentProjectIndex,
}: TodoPageProps) {
  const [projectName, setProjectName] = useState<string>("");
  const currentAccount = accounts[currentAccountIndex];
  const projects = currentAccount ? currentAccount.projects : [];
  const navigate = useNavigate();

  useEffect(() => {
    if (isProjectSelected) {
      navigate(`/todo/${projects[currentProjectIndex].id}`);
      console.log("Navigiere zum ausgewählten Projekt");
    } else {
      navigate("/todo");
    }
  }, [isProjectSelected, currentProjectIndex,projects, navigate, ]);

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
          todos: [],
        });
        return updatedAccounts;
      });
      setCurrentProjectIndex(newIndex);
      console.log("Projekt erstellt");
    }
    setIsProjectSelected(true);
  };

  return (
    <>
      <Sidebar
        currentAccount={currentAccount}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div className={`Todo ${isSidebarOpen ? "" : "back"}`}>
        <div className="Todo-Header">
          {isProjectSelected ? (
            <h1>Loading..</h1>
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
      </div>
    </>
  );
}
