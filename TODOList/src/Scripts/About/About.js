import React from "react";
import Header from "../Shared/Header";

function About () {
  const howToUseSection = howToUse();

  return (
    <>
      <Header level='h1' text='About' />
      <Header level='h2' text='General information' />
      
      <article
        className="mobile-width centered"
      >
        This is a practice project from The Odin Project's curriculum.
        Despite being supposed to be done with vanilla JS, it's made with React,
        since I wanted to practice it a bit.
      </article> 
      
      <Header level='h2' text='How to use' />
      { howToUseSection }
    </>
  )
}

export default About;


const howToUseItems = {
  'Use the upper panel to switch between views': {
    'Home'    : 'Refers to the default view (default project if exists ' +
                'or the About section you are currently browsing otherwise)',
    'Projects': 'Browse the list of all projects or create another one',
    'About'   : 'You are here'
  }, 
  'Use the bottom panel for stuff that was useful during development of the project': {
    'Log projects': "Logs all projects in the browser's devtools console",
    'Log tasks'   : "Same as above but logs tasks",
    'Clear LS'    : 'Dangerous, deletes all data: all your projects and tasks',
    'Download LS' : 'Download all your tasks and projects as a oneline JSON file',
    'Create example todolist':  'generates a few projects and tasks so that you can ' +
                                'easily see what this app can do'
  }, 
  'How to use the app itself': {
    'Creating projects' : 'While browsing all projects click on the button at the bottom ' +
                          'and fill the form',
    'Editing projects'  : 'Available while browsing all projects: just click the edit button ' +
                          'for a project you want to edit, make changes and click save/discard' +
                          'whether you actually want to save your changes or not, respectively',
    'Deleting projects' : 'Like above, click the delete button. Note this action cannot be undone',
    'Marking as default': 'Like above, but once a project is made default, there is no option ' +
                          'to undo this except for marking another project as default or deleting ' +
                          'it. This is intentional. Default project will be the first thing you see ' +
                          'after loading the page',
    'Visiting a project': 'To visit a single project just click on its row in the projects list. ' +
                          'This is impossible if any project is being edited, to prevent accidental ' +
                          'loss of your changes',
    'Operating on tasks': 'All of the above, except the "marking as default" part pertain to tasks as well. ' +
                          'After visiting a project, you will see a list of tasks that belong to it. ' +
                          'Follow the same steps to create, read, update or delete tasks. ' +
                          "Clicking on a task's row (while no task is being edited) will display " +
                          'just the task in a more readable manner' 
  }
};

function howToUse () {
  const items = Object.entries(howToUseItems).map(([key1, value2]) => {
    const level1 = <li key={key1}>{key1}</li>;
    const level2 = Object.entries(value2).map(([key2, value2]) => {
        return <li key={key2}>{`${key2}: ${value2}`}</li>
      });

    return (
      <>
        { level1 }
        <ul>
          {level2 }
        </ul>
      </>
    );
  });      
  
  return (
    <ul>
      { items }
    </ul>
  );
}

