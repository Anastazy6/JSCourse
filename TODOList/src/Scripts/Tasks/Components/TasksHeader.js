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
        <td>Best before</td>
        <td>Priority</td>
        <td>Status</td>
      </tr>
    </thead>
  );
}

export default TasksHeader;