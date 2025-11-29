import { Sidebar } from "./Sidebar";
import "./todoPage.css";
import { useState, useEffect } from "react";
import type { TodoPageProps } from "../../types";
import { useNavigate } from "react-router-dom";
import api from "../../api/client";

export function TodoPage({
  isSidebarOpen,
  setIsSidebarOpen,
  isProjectSelected,
  setIsProjectSelected,
  currentProjectIndex,
  setCurrentProjectIndex,
  projects,
  setProjects,
  userName,
  onLogout,
}: TodoPageProps) {
  const [projectName, setProjectName] = useState<string>("");
  
  const navigate = useNavigate();



  useEffect(() => {
    if (projects.length === 0) {
    return;
  }
    if (isProjectSelected && projects[currentProjectIndex]) {
      navigate(`/todo/${projects[currentProjectIndex].id}`);
      console.log("Navigiere zum ausgewählten Projekt");
    } else {
      navigate("/todo");
    }
  }, [isProjectSelected, currentProjectIndex,projects, navigate, ]);

  const addProject = async () => {
    const trimmedName = projectName.trim();
    
    const existingIndex = projects.findIndex((p) => p.name === trimmedName);
    if (existingIndex >= 0) {
      setCurrentProjectIndex(existingIndex);
      setIsProjectSelected(true);
      setProjectName("");
      return;
    }

    try {
      const accountId = localStorage.getItem("accountId");
      const res = await api.post("/projects", {
        name: trimmedName,
        accountId
      });
      const newProject = res.data;
      setProjects((prevProjects) => [...prevProjects, newProject]);
      setProjectName("");
      console.log("Projekt hinzugefügt:", newProject);
      setIsProjectSelected(true);
      setCurrentProjectIndex(projects.length); // Neuer Index ist am Ende der Liste

    } catch (error) {
      console.error("Fehler beim Hinzufügen des Projekts:", error);
    }
  };

  return (
    <>
      <Sidebar
        projects={projects}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        userName={userName}
        onLogout={onLogout}
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
