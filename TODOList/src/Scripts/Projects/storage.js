export function saveProject (project) { 
  let newProject = {...project};
  
  const projects = getProjects();
  const isEditingAnOldProject = projects && projects.some(p => p.id === newProject.id);

  if (projects) {    
    if (isEditingAnOldProject) {
      editProject(projects, newProject);
    } else {
      saveNewProject(projects, newProject);
    }
  // Save a new and the very first project while initializing the 'projects' item in LS
  } else {
    saveFirstProject(newProject);
  }
}

export function getProjectId () {
  return parseInt(localStorage.getItem('projectId'))
}


export function setDefaultProject (id) {
  localStorage.setItem('defaultProject', id);
}

export function getDefaultProject () {
  return parseInt(localStorage.getItem('defaultProject'));
}


export function deleteProject (id) {
  const filteredProjects = getProjects().filter(p => {
    return p.id !== id;
  });

  localStorage.setItem('projects', JSON.stringify([...filteredProjects]));
}


export function getProjects () {
  return JSON.parse(localStorage.getItem('projects'));
}


function incrementProjectId () {
  return localStorage.setItem('projectId', getProjectId() + 1);
}


function editProject (projects, newProject) {
  const nextProjects = projects.map(p => {
    if (newProject.id === p.id) return newProject;

    return p;
  })
  localStorage.setItem('projects', JSON.stringify([...nextProjects]));
}


function saveNewProject (projects, newProject) {
  localStorage.setItem('projects', JSON.stringify([...projects, newProject]));
  incrementProjectId();
}


function saveFirstProject (newProject) {
  localStorage.setItem('projects', JSON.stringify([newProject]));
  incrementProjectId();
}


// Initialize current project id variable as 0, if it's not present in local storage,
//   which is the persistent memory for this JS Project
if (!getProjectId()) {
  localStorage.setItem('projectId', 0);
}