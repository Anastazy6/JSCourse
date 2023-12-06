import { MAX_TASK_TITLE_LENGTH } from "../Constants/constraints";
import { MAX_TASK_DESCRIPTION_LENGTH } from "../Constants/constraints";
import { MIN_TASK_PRIORITY } from "../Constants/constraints";
import { MAX_TASK_PRIORITY } from "../Constants/constraints";


const currentTaskId   = () => parseInt(localStorage.getItem('taskId'));
const incrementTaskId = () => localStorage.setItem('taskId', currentTaskId() + 1);

class Task {
  constructor (props) {
    this._id          = currentTaskId();
    this._title       = props.title;
    this._description = props.description;
    this._notes       = props.notes;
    this._dueDate     = props.dueDate;
    this._bestBefore  = props.bestBefore;
    this._priority    = props.priority;
    this._status      = props.status;
    
    incrementTaskId();
  }


  get title () {
    return this._title;
  }

  get description () {
    return this._description;
  }

  get notes () {
    return this._notes;
  }

  get dueDate () {
    return this._dueDate;
  }

  get bestBefore() {
    return this._bestBefore;
  }

  get priority () {
    return (this._priority < MIN_TASK_PRIORITY
      ? MIN_TASK_PRIORITY
      : this._priority > MAX_TASK_PRIORITY
        ? MAX_TASK_PRIORITY
        : this._priority
    );
  }

  get status () {
    return this._status;
  }

  set title (title) {
    if (title.length > MAX_TASK_TITLE_LENGTH) {
      throw new RangeError(
        `Title must not be longer than ${MAX_TASK_TITLE_LENGTH} characters`
      );
    }

    this._title = title;
  }


  set description (description) {
    if (description.length > MAX_TASK_DESCRIPTION_LENGTH) {
      throw new RangeError(
        `Description must not be longer than ${MAX_TASK_DESCRIPTION_LENGTH} characters`
      );
    }

    this._description = description;
  }


  set priority (value) {
    if (value < MIN_TASK_PRIORITY || MAX_TASK_PRIORITY < value) {
      throw new RangeError(
        `priority must neither be lesser than ${MIN_TASK_PRIORITY} \
        nor greater than ${MAX_TASK_PRIORITY}`
      );
    }

    if (!(Number.isInteger(value))) {
      throw new TypeError(
        `priority must be an integer (got ${typeof value})`
      );
    }

    this._priority = value;
  }


  /**
   * Properties to implement:
   * title       (mandatory)
   * description (optional, only needed when the title is not decriptive enough)
   * notes       (optional, bonus info that doesn't fit the title and description fields)
   * due date    (mandatory)
   * best before (optional, only used when there's additional benefit to complete
   *              a task before its deadline)
   * priority    (or importance, whatever it will be called, mandatory, measured
   *              relatively to the other tasks within a given project)
   * status      (mandatory, one of the following: 'done', 'in progress', 'failed',
   *             'pending' (default))
   */
}

export default Task;