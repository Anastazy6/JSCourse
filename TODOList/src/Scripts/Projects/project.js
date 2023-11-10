import { MAX_PROJECT_TITLE_LENGTH } from "../Constants/limits";
import { MAX_PROJECT_DESCRIPTION_LENGTH } from "../Constants/limits";

import { MIN_PROJECT_PRIORITY } from "../Constants/limits";
import { MAX_PROJECT_PRIORITY } from "../Constants/limits";
import Task from "../Tasks/task";

class Project {
  static ID = 0;

  constructor (props) {
    this.id          = Project.ID;
    this.title       = props.title;
    this.description = props.description;
    this.notes       = props.notes;
    this.priority    = props.priority;
    this.tasks       = [];

    Project.ID++;
  }


  set id (_value) {
    throw new SyntaxError("Changing the id property of a project is not allowed");
  }


  set title (title) {
    if (title.length > MAX_PROJECT_TITLE_LENGTH) {
      throw new RangeError(
        `Title must not be longer than ${MAX_PROJECT_TITLE_LENGTH} characters`
      );
    }

    this.title = title;
  }


  set description (description) {
    if (description.length > MAX_PROJECT_DESCRIPTION_LENGTH) {
      throw new RangeError(
        `Description must not be longer than ${MAX_PROJECT_DESCRIPTION_LENGTH} characters`
      );
    }
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

    this.priority = value;
  }

  get priority () {
    // Ensure it
    if (this.priority < MIN_PROJECT_PRIORITY) {
      return MIN_PROJECT_PRIORITY;
    }
  }


  addTask (task) {
    if (!(task instanceof Task)) {
      throw new TypeError(
        `A task must be an instance of the Task class, got ${typeof Task}`
      );
    }

    this.tasks = [...this.tasks, task];
  }


  deleteTask (taskID) {
    const task = this.tasks.find(task => task.id === taskID);

    if (!task) {
      console.warn(`Couldn't find a task with id ${taskID}`);
      return;
    }

    let index = this.tasks.indexOf(task);

    this.tasks = [
      ...this.tasks.slice(0, index),
      ...this.tasks.slice(index + 1)
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