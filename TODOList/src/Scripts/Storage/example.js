function createExampleTODOList () {
  localStorage.setItem('projects', '[{"title":"Finish this project","description":"Title","notes":"This is an example project","priority":"7","tasks":[0,1,2,3,9,10,11],"id":1},{"title":"Learn Welsh","description":"Just do it, whatever it takes","notes":"","priority":"10","tasks":[4,5,6,7],"id":2},{"title":"Learn Norwegian","description":"At least revise it, it would be a bummer to throw away all that work and time spend on learning it","notes":"","priority":"6","tasks":[8],"id":3}]');
  lo
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