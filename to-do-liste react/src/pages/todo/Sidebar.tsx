import { Link } from "react-router";
import { useState } from "react";
import "./Sidebar.css";
import type { SidebarProps } from "../../types";




export function Sidebar({ currentAccount,isSidebarOpen, setIsSidebarOpen }: SidebarProps) {

  const [searchTerm, setSearchTerm] = useState("");

  const projects = currentAccount.projects;

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  
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
              {currentAccount.userName}
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
              <Link className="ausloggen-link" to="/">Ausloggen</Link>
          </div>
        </aside>
      </div>
    </>
  );
}
