import { Link } from "react-router";
import "./Sidebar.css";
import type { SidebarProps } from "../../types";



export function Sidebar({ currentAccount,isSidebarOpen, setIsSidebarOpen  }: SidebarProps) {
  

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
            <Link to="/">
              <span className="material-icons">account_circle</span>
              {currentAccount.userName}
            </Link>
            <button
              className="side-Button"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <span className="material-icons-outlined">menu</span>
            </button>
          </div>
          <div className="sidebar_middle">
            <form action="/suche">
              <input
                className="suche"
                type="search"
                placeholder="Aufgabe Suchen"
              />
            </form>
          </div>
        </aside>
      </div>
    </>
  );
}
