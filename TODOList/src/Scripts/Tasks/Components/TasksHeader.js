import React from "react";


function TasksHeader () {
  return (
    <thead>
      <tr>
        <td>Id</td>
        <td>Title</td>
        <td>Description</td>
        <td>Notes</td>
        <td>Due date</td>
        <td>Priority</td>
        <td>Status</td>
        <td>Actions</td>
      </tr>
    </thead>
  );
}

export default TasksHeader;