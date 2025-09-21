import { accounts, currentAccountIndex, saveAccounts } from "./account.js";


let projects =accounts[currentAccountIndex].projects || (accounts[currentAccountIndex].projects = []);

let currentProjectIndex = 0;

if (projects.length === 0) {
  projects.push({ name: "", todos: [] });
  saveAccounts();
}


if (document.getElementById('Liste')) {
  renderTodo();
}
function addProject () {
  const projectName = document.getElementById('projectName').value;
  const projectIndex = projects.findIndex(p => p.name === projectName);
  if(projectIndex !== -1) {
   currentProjectIndex = projectIndex;
  } else {
    projects.push( {
      name: projectName,
      todos: []
    });
    currentProjectIndex = projects.length -1;
    saveAccounts();
  }
  saveAccounts();

  document.getElementById('project').innerHTML = projects[currentProjectIndex].name;
  document.getElementById('todoInput').innerHTML = `
    <input id="taskInput" type="text" placeholder="Aufgabe eingeben">
      <button onclick="
        addTodo();
      ">+</button>
  `;
  renderTodo();
}

function renderTodo () {
  const list = projects[currentProjectIndex].todos;
  let html = '';
  list.forEach(item => {
    html += `
    <div>
      <ul>
        <li id= "${item.id}">
          <input type="checkbox"
            onchange="toggleDone('${item.id}', this.checked)"
            ${item.done ? 'checked' : ''}
          > ${item.content}
          <button onclick = "
            deleteTodo('${item.id}');
          ">delete</button>
        </li>
      </ul>
    </div>
  `;
  });
  document.getElementById('Liste').innerHTML = html;
}

function toggleDone (itemId, isChecked) {
  const todo = projects[currentProjectIndex].todos.find(t => t.id === itemId);
  if (todo) {
    todo.done = isChecked;
    saveAccounts();
    renderTodo();
  }
}


function deleteTodo (itemId) {
  const list = projects[currentProjectIndex].todos;
  projects[currentProjectIndex].todos= list.filter(todo => todo.id !== itemId);
  
  
  saveAccounts();
  renderTodo();
}

function addTodo () {
  const item = {
    content: document.getElementById('taskInput').value,
    id: crypto.randomUUID(),
    done: false
  };
  projects[currentProjectIndex].todos.push(item);
  saveAccounts();
  renderTodo();
}

/*function saveToStorage () {
  //localStorage.setItem('todo',JSON.stringify(todos));
  localStorage.setItem('project',JSON.stringify(projects1));
}*/

window.addProject = addProject;
window.addTodo = addTodo;
window.deleteTodo = deleteTodo;
window.toggleDone = toggleDone;