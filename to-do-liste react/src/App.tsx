import "./App.css";
import { LoginPage } from "./pages/login/loginPage";
import { Route, Routes } from "react-router-dom";
import { TodoPage } from "./pages/todo/todoPage";
import { useState, useEffect } from "react";
import { RegistrationPage } from "./pages/Registration/registrationPage";
import { ProjectPage } from "./pages/todo/projectPage";
import api from "./api/client";

function App() {
  const [projects, setProjects] = useState<{ id: number; name: string }[]>([]);



  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [isProjectSelected, setIsProjectSelected] = useState(false);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  useEffect(() => {
    const accountId = localStorage.getItem("accountId");
    async function fetchProjects() {
      try {
        const res = await api.get("/projects", {
          params: { accountId },
        });
        setProjects(res.data);
      } catch (error) {
        console.error("Fehler beim Laden der Projekte:", error);
      }
    }
    fetchProjects();
  }, []);


  return (
    <>
      <Routes>
        <Route
          index
          element={
            <LoginPage
              userName={userName}
              setUserName={setUserName}
              password={password}
              setPassword={setPassword}
            />
          }
        />
        <Route
          path="/todo"
          element={
            <TodoPage
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
              isProjectSelected={isProjectSelected}
              setIsProjectSelected={setIsProjectSelected}
              currentProjectIndex={currentProjectIndex}
              setCurrentProjectIndex={setCurrentProjectIndex}
              projects={projects}
              setProjects={setProjects}
              userName={userName}
            />
          }
        />
        <Route
          path="/todo/:id"
          element={
            <ProjectPage
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
              setIsProjectSelected={setIsProjectSelected}
              currentProjectIndex={currentProjectIndex}
              setCurrentProjectIndex={setCurrentProjectIndex}
              projects={projects}
              setProjects={setProjects}
              userName={userName}
            />
          }
        />
        <Route
          path="/registration"
          element={
            <RegistrationPage
              userName={userName}
              setUserName={setUserName}
              password={password}
              setPassword={setPassword}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
