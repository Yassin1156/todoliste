import type { TodoPageProps } from "../../types";
import { useState } from "react";

export function TodoPage({
  accounts,
  currentAccountIndex,
  setAccounts,
}: TodoPageProps) {

  const [projectName, setProjectName] = useState<string>("");
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);


  const currentAccount = accounts[currentAccountIndex];
  const projects = currentAccount ? currentAccount.projects : [];

  const addProject = () => {
    const projectIndex = projects.findIndex((p) => p.name === projectName);
    if (projectIndex >= 0) {
      setCurrentProjectIndex(projectIndex);
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
      setProjectName("");
      console.log("Projekt erstellt");
    }
  }

  return (
    <>
      <title>ToDo Page</title>

      <div className="Todo">
        <div className="Todo-Header">
          <h1>
            <input
              type="text"
              placeholder="Bitte geben sie den Projektnamen ein"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
            <button onClick={addProject}>+</button>
          </h1>
        </div>
      </div>
    </>
  );
}
