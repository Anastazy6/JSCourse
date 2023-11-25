import { MAX_PROJECT_DESCRIPTION_LENGTH } from "../Constants/constraints";
import { MAX_PROJECT_TITLE_LENGTH       } from "../Constants/constraints";
import { MIN_PROJECT_PRIORITY           } from "../Constants/constraints";
import { MAX_PROJECT_PRIORITY           } from "../Constants/constraints";


// Testing: Consider moving this stuff to a dedicated testing directory
import VALID_FORM_CONTROLS from "../Constants/form_controls";
import VALID_INPUT_TYPES   from "../Constants/form_input_types";

const formItems = [
  {
    name    : 'Title',
    tag     : 'input',
    required: true,
    props   : {
      type     : 'text',
      maxlength: MAX_PROJECT_TITLE_LENGTH,
    },
  }, {
    name    : 'Description',
    tag     : 'textarea',
    required: false,
    props   : {
      maxlength: MAX_PROJECT_DESCRIPTION_LENGTH
    }
  }, {
    name    : 'Notes',
    tag     : 'textarea',
    required: false,
  }, {
    name    : 'Priority',
    tag     : 'input',
    required: true,
    props   : {
      type     : 'number',
      min      : MIN_PROJECT_PRIORITY,
      max      : MAX_PROJECT_PRIORITY,
    }
  }
];

/**
 * Development mode function for checking whether the input types are valid.
 *   Add more type checks here whenever the form uses additional controls
 *   or move this testing stuff to a dedicated testing directory if it grows
 *   too much
 */
function typeCheck () {
  formItems.forEach(item => {
    let controlType = item.tag;

    if (!(VALID_FORM_CONTROLS.includes(controlType))) {
      throw new TypeError(`Invalid form control type: ${controlType}`);
    }

    if (controlType === 'input') {
      let inputType = item.props.type;
      if (!(VALID_INPUT_TYPES.includes(inputType))) {
        throw new TypeError(`Invalid form input type: ${inputType}`);
      }
    }
  });
}

//typeCheck();


export default formItems;