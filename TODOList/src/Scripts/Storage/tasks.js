import {
  addTaskToProject,
  removeTaskFromProject,
  getProjects
} from './projects';


// Note: it might be worth to refactor Projects' storage so as to be used for
//   both by passing a type parameter os something like that.

export function saveTask (task, project) { 
  let newTask = {...task};
  
  const tasks = getAllTasks();
  const isEditingAnOldTask = tasks && tasks.some(p => p.id === newTask.id);

  if (tasks) {    
    if (isEditingAnOldTask) {
      editTask(tasks, newTask);
    } else {
      saveNewTask(tasks, newTask);
    }
  // Save a new and the very first Task while initializing the 'tasks' item in LS
  } else {
    saveFirstTask(newTask);
  }

  addTaskToProject(project.id, newTask.id);
}


export function getNextTaskId () {
  return parseInt(localStorage.getItem('nextTaskId'))
}


export function deleteTask (id) {
  const filteredTasks = getTasks().filter(p => {
    return p.id !== id;
  });

  localStorage.setItem('tasks', JSON.stringify([...filteredTasks]));
  forgetTask(id);
}


export function getTasks (project) {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  if (!tasks) return false;

  console.log(project);

  return tasks.filter(t => project.tasks.includes(t.id));
}


function incrementNextTaskId () {
  return localStorage.setItem('nextTaskId', getNextTaskId() + 1);
}


function editTask (tasks, newTask) {
  const nextTasks = tasks.map(p => {
    if (newTask.id === p.id) return newTask;

    return p;
  })
  localStorage.setItem('tasks', JSON.stringify([...nextTasks]));
}


function saveNewTask (tasks, newTask) {
  localStorage.setItem('tasks', JSON.stringify([...tasks, newTask]));
  incrementNextTaskId();
}


function saveFirstTask (newTask) {
  localStorage.setItem('tasks', JSON.stringify([newTask]));
  incrementNextTaskId();
}


function getAllTasks () {
  return JSON.parse(localStorage.getItem('tasks'));
}

// Initialize current Task id variable as 0, if it's not present in local storage,
//   which is the persistent memory for this JS Task
if (!getNextTaskId()) {
  localStorage.setItem('nextTaskId', 0);
}

/**
 * Removes the Task's id from every Project's tasks property
 * @param {*} taskId 
 */
function forgetTask (taskId) {
  getProjects().forEach(project => {
    if (project.tasks.includes(id)) {
      removeTaskFromProject(project.id, taskId);
    }
  });
}