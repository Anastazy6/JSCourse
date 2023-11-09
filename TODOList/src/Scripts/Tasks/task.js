class Task {
  constructor (props) {
    this.id          = props.id;
    this.title       = props.title;
    this.description = props.description;
    this.notes       = props.notes;
    this.dueDate     = props.dueDate;
    this.bestBefore  = props.bestBefore;
    this.priority    = props.priority;
    this.status      = props.status;
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