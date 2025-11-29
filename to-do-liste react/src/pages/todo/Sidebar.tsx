import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Sidebar.css";
import type { SidebarProps } from "../../types";




export function Sidebar({projects, isSidebarOpen, setIsSidebarOpen, userName, onLogout }: SidebarProps) {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");


  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = () => {
    onLogout();
    navigate("/");
    console.log("Ausgeloggt");
  };

  
  return (
    <>
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />

      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined"
        rel="stylesheet"
      ></link>


      <div className={`containerSidebar ${isSidebarOpen ? "" : "back"}`}>
        <aside className="sidebar">
          <div className="sidebar-header">
              <span className="material-icons"
                
              >account_circle</span>
              {userName}
            <button
              className="side-Button"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <span className="material-icons-outlined">menu</span>
            </button>
          </div>
          <div className="sidebar_middle">
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                className="suche"
                type="search"
                placeholder="Aufgabe Suchen"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
            <ul className="project-list">
              { filteredProjects.map((project) => (
                <div key={project.id}>
                  <li  className="project-item">
                    <Link to={`/todo/${project.id}`} className="project-link">
                      {project.name} 
                    </Link>
                  </li>
                </div>
            ))}
            </ul>
          </div>
          <div className="sidebar-footer">
              <button onClick={handleLogout} className="ausloggen-link" >Ausloggen</button>
          </div>
        </aside>
      </div>
    </>
  );
}
