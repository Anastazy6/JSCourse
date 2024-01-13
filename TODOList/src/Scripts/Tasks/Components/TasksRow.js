import React, { useState } from "react";

import EditTask from "./EditTask";

import * as Storage from '../../Storage/tasks';
import { getExcerpt } from "../../Shared/helpers";

import { useEdits, useEditsDispatch } from "../../Contexts/EditsContext";

function TasksRow ({props, onUpdate, onVisit}) {
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


  const activeEdits         = useEdits();
  const dispatchActiveEdits = useEditsDispatch();

  const [edit, setEdit] = useState(false);


  function handleEdit (e) {
    e.stopPropagation();

    dispatchActiveEdits({
      type: edit ? 'closed_edit' : 'opened_edit'
    });

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
            task       ={ task }
            setTask    ={ setTask }
            onCloseForm={ handleEdit }
          />
        : <tr
            onClick={ () => activeEdits > 0 ? null : onVisit(task.id) }
          >
          <td>{ task.id}</td>
          <td>{ getExcerpt(60, task.title)       }</td>
          <td>{ getExcerpt(75, task.description) }</td>
          <td>{ getExcerpt(75, task.notes)       }</td>
          <td>{ task.dueDate  }</td>
          <td>{ task.priority }</td>
          <td
            className={ `task-status-${task.status}` }
          >{ task.status }</td>
          <td className="actions-column">
            <button
              onClick  ={ (e) => handleEdit(e) }
              className="btn btn-outline-success item-action-btn"
            >
              Edit
            </button>

            <button
              onClick  ={ (e) => handleDelete(e) }
              className="btn btn-outline-danger item-action-btn"
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