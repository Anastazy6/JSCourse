// Hardcoded on purpose
const exampleStorage = {
  "nextTaskId"     :13,
  "defaultProject" :1,
  "newProjectId"   :4,
  "projects": [{
    "title"      : "Finish this project",
    "description": "Title",
    "notes"      : "This is an example project",
    "priority"   : "7",
    "tasks"      : [0,1,2,3,9,10,11],
    "id"         : 1
  }, {
    "title"      : "Learn Welsh",
    "description": "Just do it, whatever it takes",
    "notes"      : "",
    "priority"   : "10",
    "tasks"      : [4,5,6,7],
    "id"         :2
  }, {
    "title"      : "Learn Norwegian",
    "description": "At least revise it, it would be a bummer to throw away all that work and time spend on learning it",
    "notes"      : "",
    "priority"   : "6",
    "tasks"      : [8],
    "id"         :3
  }],
  // too long to bother with pretty formatting...
  "tasks" : [{"id":0,"title":"Fix styling","description":"Title says it all","notes":"Definitely fix button placement in Task creation form etc.","dueDate":"2024-01-04","priority":1,"status":"Active","min":"2024-01-04"},{"id":1,"title":"Fix due date date picker","description":"Does not respond to clicks, despite being functional in the past","notes":"Both new task and edit task forms are affected","dueDate":"2024-01-04","priority":6,"status":"Active","min":"2024-01-04"},{"id":2,"title":"Add single task view","description":"It would be helpful to display a single task in a more readable way than a table.","notes":"It's even more important due to the fact that the tasks' info in the table are to be limited be the getExcerpt() function to limit the length of displayed text, so that the stuff does not inflate the table way too much.","dueDate":"2024-01-04","priority":3,"status":"Active","min":"2024-01-04"},{"title":"Fix status picker","priority":"3","description":"It used to work, now it doesn't","notes":"Also fix the styling so that the expanded select's background isn't white.","dueDate":"2024-01-04","status":"Active","min":"2024-01-04","id":3},{"title":"Do some Duolingo","priority":"7","description":"Gotta keep that streak","notes":"","dueDate":"2024-01-04","status":"Active","min":"2024-01-04","id":4},{"title":"Learn vocabulary","priority":1,"description":"Write down some new words from those damned BBC Cymru Fyw articles and memorize them using Quizlet or whatever","notes":"","dueDate":"2024-01-04","status":"Active","min":"2024-01-04","id":5},{"title":"Revise vocabulary","priority":1,"description":"It would suck to waste all the hard work","notes":"","dueDate":"2024-01-04","status":"Active","min":"2024-01-04","id":6},{"title":"Practice listening and speaking","priority":1,"description":"These skills might get handy some time...","notes":"","dueDate":"2024-01-04","status":"Active","min":"2024-01-04","id":7},{"title":"Just do it","priority":1,"description":"","notes":"It's just like the learn Welsh project, following the same steps (with minor modifications) should yield similar results.","dueDate":"2024-01-04","status":"Active","min":"2024-01-04","id":8},{"title":"Add a 'generate example TODOlist button'","priority":1,"description":"","notes":"","dueDate":"2024-01-04","status":"Active","min":"2024-01-04","id":9},{"title":"Finish view switching","priority":1,"description":"Clicking on a project in the projects list should switch the view to that project, same for tasks","notes":"","dueDate":"2024-01-04","status":"Active","min":"2024-01-04","id":10},{"title":"Add a short 'About' section","priority":1,"description":"","notes":"","dueDate":"2024-01-04","status":"Active","min":"2024-01-04","id":11}],
};

export function setExampleStorage () {
  localStorage.clear();
  Object.entries(exampleStorage).forEach(([key, value]) => {
    localStorage.setItem(key, JSON.stringify(value));
  });
}


export function downloadLocalStorage () {
  let anchor = document.createElement('a');

  anchor.href = URL.createObjectURL(
    new Blob([parseLocalStorage()], {type: "application/json"})
  );
  
  anchor.download = 'TODO_list.json';
  anchor.click();
}

function parseLocalStorage (stringify=true) {
  let data = {};

  Object.entries(localStorage).forEach(([key, value]) => {
    data[key] = JSON.parse(value);
  });

  return stringify ? JSON.stringify(data) : data;
}