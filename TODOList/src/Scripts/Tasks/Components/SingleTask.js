import React, { useState } from "react";

import EditTask from "./EditTask";

function SingleTask ({props}) {
  const [task, setTask] = useState({
    id         : props.id,
    title      : props.title,
    description: props.description,
    notes      : props.notes,
    dueDate    : props.dueDate,
    bestBefore : props.bestBefore,
    priority   : props.priority,
    status     : props.status
  });


  const [edit, setEdit] = useState(false);


  function handleEdit () {
    setEdit(!edit);
  }


  function handleDelete () {
    
  }


  return (
    <>
      {edit
        ? <EditTask {...task} />
        : <tr>
          <td>{task.id}</td>
          <td>{task.title}</td>
          <td>{task.description}</td>
          <td>{task.notes}</td>
          <td>{task.dueDate}</td>
          <td>{task.bestBefore}</td>
          <td>{task.priority}</td>
          <td>{task.status}</td>
          <td>
            <button
              onClick={handleEdit}
              className="btn btn-outline-success"
            >
              Edit
            </button>

            <button
              onClick={handleDelete}
              className="btn btn-outline-danger"
            >
              Delete
            </button>
          </td>
        </tr>
      }
    </>
  )
}

export default SingleTask;