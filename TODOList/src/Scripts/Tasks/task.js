import { MAX_TASK_TITLE_LENGTH } from "../Constants/limits";
import { MAX_TASK_DESCRIPTION_LENGTH } from "../Constants/limits";
import { MIN_TASK_PRIORITY } from "../Constants/limits";
import { MAX_TASK_PRIORITY } from "../Constants/limits";


class Task {
  static ID = 0

  constructor (props) {
    this.id          = Task.ID;
    this.title       = props.title;
    this.description = props.description;
    this.notes       = props.notes;
    this.dueDate     = props.dueDate;
    this.bestBefore  = props.bestBefore;
    this.priority    = props.priority;
    this.status      = props.status;

    Task.ID++;
  }

  set id (_value) {
    throw new SyntaxError("Changing the id property of a task is not allowed");
  }


  set title (title) {
    if (title.length > MAX_TASK_TITLE_LENGTH) {
      throw new RangeError(
        `Title must not be longer than ${MAX_TASK_TITLE_LENGTH} characters`
      );
    }

    this.title = title;
  }


  set description (description) {
    if (description.length > MAX_TASK_DESCRIPTION_LENGTH) {
      throw new RangeError(
        `Description must not be longer than ${MAX_TASK_DESCRIPTION_LENGTH} characters`
      );
    }

    this.description = description;
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

    this.priority = value;
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