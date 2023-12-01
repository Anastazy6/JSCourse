import { 
  MAX_PROJECT_TITLE_LENGTH,
  MAX_PROJECT_DESCRIPTION_LENGTH,
  MIN_PROJECT_PRIORITY,
  MAX_PROJECT_PRIORITY 
} from "../Constants/constraints";


export function isProjectValid (project) {
  let invalidFields = 0;
  let message       = '';

  if (project.title.length > MAX_PROJECT_TITLE_LENGTH) {
    invalidFields++;
    message += `Title is too long. Max length is ${MAX_PROJECT_TITLE_LENGTH},` +
      ` got ${project.title.length}.\n`;
  }

  if (project.description.length > MAX_PROJECT_DESCRIPTION_LENGTH) {
    invalidFields++;
    message += "Description is too long. Max length is " +
      `${MAX_PROJECT_DESCRIPTION_LENGTH}, got ${project.description.length}.\n`
  }

  if (project.priority < MIN_PROJECT_PRIORITY) {
    invalidFields++;
    message += `Priority is too low. Min is ${MIN_PROJECT_PRIORITY}, got ${project.priority}`;
  }

  if (project.priority > MAX_PROJECT_PRIORITY) {
    invalidFields++;
    message += `Priority is too high. Min is ${MAX_PROJECT_PRIORITY}, got ${project.priority}`;
  }

  if (invalidFields > 0) {
    printFailureMessage(invalidFields, message);
    return false;
  }
  return true;
}




function printFailureMessage (invalidFields, message) {
  console.warn(
    `The form didn't pass the validation due to ${invalidFields}` +
    ` issue${invalidFields > 1 ? 's' : ''}:\n` +message
  );
}