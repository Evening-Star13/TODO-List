// COMMENT:  Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// COMMENT:  Load all event listeners
loadEventListeners();

// COMMENT:  Load all event listeners
function loadEventListeners() {
  // COMMENT:  DOM Load event
  document.addEventListener('DOMContentLoaded', getTasks);
  // COMMENT:  Add task event
  form.addEventListener('submit', addTask);
  // COMMENT:  Remove task event
  taskList.addEventListener('click', removeTask);
  // COMMENT:  Clear task event
  clearBtn.addEventListener('click', clearTasks);
  // COMMENT:  Filter tasks event
  filter.addEventListener('keyup', filterTasks);
}

// COMMENT:  Get Tasks from LS
function getTasks() {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    // COMMENT:  Create li element
    const li = document.createElement('li');
    // COMMENT:  Add class
    li.className = 'collection-item';
    // COMMENT:  Create text node and append to li
    li.appendChild(document.createTextNode(task));
    // COMMENT:  Create new link element
    const link = document.createElement('a');
    // COMMENT:  Add class
    link.className = 'delete-item secondary-content';
    // COMMENT:  Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // COMMENT:  Append the link to li
    li.appendChild(link);

    // COMMENT:  Append li to ul
    taskList.appendChild(li);
  });
}

// COMMENT: Add Task
function addTask(e) {
  if(taskInput.value === '') {
    alert('Add a task');
  }

  // COMMENT:  Create li element
  const li = document.createElement('li');
  // COMMENT:  Add class
  li.className = 'collection-item';
  // COMMENT:  Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // COMMENT:  Create new link element
  const link = document.createElement('a');
  // COMMENT:  Add class
  link.className = 'delete-item secondary-content';
  // COMMENT:  Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // COMMENT:  Append the link to li
  li.appendChild(link);

  // COMMENT:  Append li to ul
  taskList.appendChild(li);

  // COMMENT:  Store in LS
  storeTaskInLocalStorage(taskInput.value);

  // COMMENT:  Clear input
  taskInput.value = '';

  e.preventDefault();
}

// COMMENT:  Store Task
function storeTaskInLocalStorage(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// COMMENT:  Remove Task
function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Are You Sure?')) {
      e.target.parentElement.parentElement.remove();

      // COMMENT:  Remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// COMMENT:  Remove from LS
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// COMMENT:  Clear Tasks
function clearTasks() {
  // COMMENT:  taskList.innerHTML = '';

  // COMMENT:  COMMENT:  Faster
  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // COMMENT:  https:// COMMENT: jsperf.com/innerhtml-vs-removechild

 // COMMENT:  COMMENT:  Clear from LS
  clearTasksFromLocalStorage();
}

// COMMENT:  COMMENT:  Clear Tasks from LS
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// COMMENT:  COMMENT:  Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}