// Note: it might be worth to refactor Projects' storage so as to be used for
//   both by passing a type parameter os something like that.

export function saveTask (task) { 
  let newTask = {...task};
  
  const tasks = getTasks();
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
}


export function getTaskId () {
  return parseInt(localStorage.getItem('taskId'))
}


export function deleteTask (id) {
  const filteredTasks = getTasks().filter(p => {
    return p.id !== id;
  });

  localStorage.setItem('tasks', JSON.stringify([...filteredTasks]));
}


export function getTasks () {
  return JSON.parse(localStorage.getItem('tasks'));
}


function incrementTaskId () {
  return localStorage.setItem('taskId', getTaskId() + 1);
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
  incrementTaskId();
}


function saveFirstTask (newTask) {
  localStorage.setItem('tasks', JSON.stringify([newTask]));
  incrementTaskId();
}


// Initialize current Task id variable as 0, if it's not present in local storage,
//   which is the persistent memory for this JS Task
if (!getTaskId()) {
  localStorage.setItem('taskId', 0);
}