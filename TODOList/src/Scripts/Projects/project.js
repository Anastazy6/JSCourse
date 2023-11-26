import { MAX_PROJECT_TITLE_LENGTH } from "../Constants/constraints";
import { MAX_PROJECT_DESCRIPTION_LENGTH } from "../Constants/constraints";

import { MIN_PROJECT_PRIORITY } from "../Constants/constraints";
import { MAX_PROJECT_PRIORITY } from "../Constants/constraints";
import Task from "../Tasks/task";

class Project {
  static ID = 0;

  constructor (props) {
    this._id          = Project.ID;
    this._title       = props.title;
    this._description = props.description;
    this._notes       = props.notes;
    this._priority    = props.priority;
    this._tasks       = [];

    Project.ID++;
  }


  serialize () {
    return {
      id         : this._id,
      title      : this._title,
      description: this._description,
      notes      : this._notes,
      priority   : this._priority,
      tasks      : this._tasks.map(t => t.id)
    };
  }


  get id () {
    return this._id;
  }


  get title () {
    return this._title;
  }

  set title (newTitle) {
    if (newTitle.length > MAX_PROJECT_TITLE_LENGTH) {
      throw new RangeError(
        `Title must not be longer than ${MAX_PROJECT_TITLE_LENGTH} characters`
      );
    }

    console.log(`Changing project title from ${this.title} to ${newTitle}`);
    this._title = newTitle;
  }

  
  get description () {
    return this._description;
  }


  set description (newDescription) {
    if (newDescription.length > MAX_PROJECT_DESCRIPTION_LENGTH) {
      throw new RangeError(
        `Description must not be longer than ${MAX_PROJECT_DESCRIPTION_LENGTH} characters`
      );
    }

    this._description = newDescription;
  }




  set priority (value) {
    if (value < MIN_PROJECT_PRIORITY || MAX_PROJECT_PRIORITY < value) {
      throw new RangeError(
        `priority must neither be lesser than ${MIN_PROJECT_PRIORITY} \
        nor greater than ${MAX_PROJECT_PRIORITY}`
      );
    }

    if (!(Number.isInteger(value))) {
      throw new TypeError(
        `priority must be an integer (got ${typeof value})`
      );
    }

    this._priority = value;
  }

  get priority () {
    // Ensure it returns a value within the current constraints (even if they've been
    //   changed in such a way that the old priority is out of boundaries)
    if (this._priority < MIN_PROJECT_PRIORITY) {
      return MIN_PROJECT_PRIORITY;
    } else if (this._priority > MIN_PROJECT_PRIORITY) {
      return MAX_PROJECT_PRIORITY;
    } 
    return this._priority;
  }


  addTask (task) {
    if (!(task instanceof Task)) {
      throw new TypeError(
        `A task must be an instance of the Task class, got ${typeof Task}`
      );
    }

    this._tasks = [...this._tasks, task];
  }


  deleteTask (taskID) {
    const task = this._tasks.find(task => task.id === taskID);

    if (!task) {
      console.warn(`Couldn't find a task with id ${taskID}`);
      return;
    }

    let index = this._tasks.indexOf(task);

    this._tasks = [
      ...this._tasks.slice(0, index),
      ...this._tasks.slice(index + 1)
    ];
  }

  /** Properties to implement:
   * 
   * title       (mandatory)
   * description (optional, recommended)
   * notes       (totally optional)
   * priority  (mandatory, priority is measured relatively to the other projects) 
   * tasks       (the very point of a project: grouping tasks. Most likely an array)
   * isDefault   (mandatory, but might be implemented as a global variable: a pointer
   *              to the currently default project, which will be loaded on the home page)
   * 
   */
}

export default Project;