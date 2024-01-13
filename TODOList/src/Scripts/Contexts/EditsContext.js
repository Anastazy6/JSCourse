import React, {
  createContext,
  useContext,
  useReducer
} from "react";

const EditsContext         = createContext(null);
const EditsDispatchContext = createContext(null);

/**
 * 
 * Stores information whether the user is editing a project or a tosk.
 * 
 */
export function EditsProvider ({ children }) {
  const [edits, dispatch] = useReducer(editsReducer, 0);

  return (
    <EditsContext.Provider value={ edits }>
      <EditsDispatchContext.Provider value={ dispatch }>
        { children }
      </EditsDispatchContext.Provider>
    </EditsContext.Provider>
  );
}

export function useEdits () {
  return useContext(EditsContext);
}

export function useEditsDispatch () {
  return useContext(EditsDispatchContext);
}


function editsReducer (edits, action) {
  switch(action.type) {
    case 'page_loaded': {
      return 0;
    }
    case 'opened_edit': {
      return edits + 1;
    }
    case 'closed_edit': {
      return edits - 1;
    }
    default: { 
      throw Error(`Invalid action type: ${action.type}`);
    }
  }
}