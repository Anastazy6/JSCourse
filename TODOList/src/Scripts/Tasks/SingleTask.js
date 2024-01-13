import React from "react";

import Header from "../Shared/Header";
import * as Storage from "../Storage/tasks"; 
import { useViewDispatch } from "../Contexts/ViewContext";


function SingleTask ({taskId, hostProjectId=null}) {
  const task = Storage.getTask(taskId);

  const dispatchView = useViewDispatch();

  function onReturnToProject () {
    dispatchView({
      type: 'switched_view',
      nextView: {
        type: 'singleProject',
        itemId: hostProjectId
      }
    })
  }

  const notesSection = task.notes === ''
    ? null
    : 
      <>
        <Header level='h2' text='Notes' />
        <article
          className='centered mobile-width'
        >
          {task.notes}
        </article>
      </>


  return (
    <>
      <Header level='h1' text={task.title} />
      
      <article
        className='centered mobile-width'
      >
        {task.description}
      </article>
      
      {notesSection}

    <Header level='h3' text='Additional information' />
      <article
        id="task-additional-info"
        className="mobile-width centered"
      >
        <div>Priority</div>
        <div>{ task.priority }</div>
        <div>Due date</div>
        <div>{ task.dueDate }</div>
        <div>Status</div>
        <div className={`task-status-${ task.status }`}>{ task.status } </div>
      </article>  

      { hostProjectId && (
        <button
          className="centered btn btn-outline-lleuad-lawn"
          onClick={onReturnToProject}
        >
          Go back
        </button>
      )}
    </>
  )
}

export default SingleTask;