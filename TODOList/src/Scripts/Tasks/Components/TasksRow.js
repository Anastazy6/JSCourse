import React, { useState } from "react";

import EditTask from "./EditTask";

import * as Storage from '../../Storage/tasks';

function TasksRow ({props, onUpdate}) {
  const [task, setTask] = useState({
    id         : props.id,
    title      : props.title,
    description: props.description,
    notes      : props.notes,
    dueDate    : props.dueDate,
    priority   : props.priority,
    status     : props.status,
    min        : props.min // read-only, limits the duedate so that the task cannot be overdue BEFORE it's creation date
  });


  const [edit, setEdit] = useState(false);


  function handleEdit () {
    setEdit(!edit);
  }

  


  function handleDelete (e) {
    e.stopPropagation();

    Storage.deleteTask(task.id);
    onUpdate();
  }


  return (
    <>
      {edit
        ? <EditTask 
            task={task}
            setTask={setTask}
            onCloseForm={handleEdit}
          />
        : <tr>
          <td>{task.id}</td>
          <td>{task.title}</td>
          <td>{task.description}</td>
          <td>{task.notes}</td>
          <td>{task.dueDate}</td>
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

export default TasksRow;