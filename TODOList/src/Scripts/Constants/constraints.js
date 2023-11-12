// Project properties char limits
export const MAX_PROJECT_TITLE_LENGTH = 80;
export const MAX_PROJECT_DESCRIPTION_LENGTH = 1000;

// Project priority limits
export const MIN_PROJECT_PRIORITY = 1;
export const MAX_PROJECT_PRIORITY = 10;


// Task properties char limits
export const MAX_TASK_TITLE_LENGTH = 80;
export const MAX_TASK_DESCRIPTION_LENGTH = 1000;

// Task priority limits
export const MIN_TASK_PRIORITY = 1;
export const MAX_TASK_PRIORITY = 10;








if (MIN_PROJECT_PRIORITY > MAX_PROJECT_PRIORITY) {
  throw new RangeError(
    "Min project priority must not be higher than max priority"
  );
}

if (MIN_TASK_PRIORITY > MAX_TASK_PRIORITY) {
  throw new RangeError(
    "Min task priority must not be higher than max priority"
  );
}