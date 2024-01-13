import {
  addTaskToProject,
  removeTaskFromProject,
  getProjects
} from './projects';


// Note: it might be worth to refactor Projects' storage so as to be used for
//   both by passing a type parameter os something like that.


export function deleteTask (id) {
  const filteredTasks = getAllTasks().filter(p => {
    return p.id !== id;
  });

  localStorage.setItem('tasks', JSON.stringify([...filteredTasks]));
  forgetTask(id);
}


export function getTask (id) {
  const tasks = getAllTasks();
  if (!tasks) return null;

  return tasks.filter(t => t.id === id)[0];
}


export function getTasks (project) {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  if (!tasks) return null;

  const filteredTasks = tasks.filter(t => project.tasks.includes(t.id));

  return filteredTasks.length > 0 ? filteredTasks : null;
}


export function getNextTaskId () {
  return parseInt(localStorage.getItem('nextTaskId'))
}


export function saveTask (task, project) { 
  let newTask = {...task};
  
  const tasks = getAllTasks();
  const isEditingAnOldTask = tasks && tasks.some(p => p.id === newTask.id);

  if (tasks) {    
    if (isEditingAnOldTask) {
      return editTask(tasks, newTask);
    } else {
      saveNewTask(tasks, newTask);
    }
  // Save a new and the very first Task while initializing the 'tasks' item in LS
  } else {
    saveFirstTask(newTask);
  }

  addTaskToProject(project.id, newTask.id);
}


function editTask (tasks, newTask) {
  const nextTasks = tasks.map(p => {
    if (newTask.id === p.id) return newTask;

    return p;
  })
  localStorage.setItem('tasks', JSON.stringify([...nextTasks]));
}


/**
 * Removes the Task's id from every Project's tasks property
 * @param {*} taskId 
 */
function forgetTask (taskId) {
  getProjects().forEach(project => {
    if (project.tasks.includes(taskId)) {
      removeTaskFromProject(project.id, taskId);
    }
  });
}


function getAllTasks () {
  return JSON.parse(localStorage.getItem('tasks'));
}


function incrementNextTaskId () {
  return localStorage.setItem('nextTaskId', getNextTaskId() + 1);
}


function saveFirstTask (newTask) {
  localStorage.setItem('tasks', JSON.stringify([newTask]));
  incrementNextTaskId();
}


function saveNewTask (tasks, newTask) {
  localStorage.setItem('tasks', JSON.stringify([...tasks, newTask]));
  incrementNextTaskId();
}


// Initialize current Task id variable as 0, if it's not present in local storage,
//   which is the persistent memory for this JS Task
if (!getNextTaskId()) {
  localStorage.setItem('nextTaskId', 0);
}

