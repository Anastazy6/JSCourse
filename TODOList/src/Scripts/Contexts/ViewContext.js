import React, {
  createContext,
  useContext,
  useReducer
} from "react";

import { getDefaultProject } from "../Storage/projects";

const ViewContext         = createContext(null);
const ViewDispatchContext = createContext(null);


export function ViewProvider ({ children }) {
  const [view, dispatch] = useReducer(viewReducer, getDefaultView());


  return (
    <ViewContext.Provider value={ view }>
      <ViewDispatchContext.Provider value= { dispatch }>
        { children }
      </ViewDispatchContext.Provider>
    </ViewContext.Provider>
  );
}


export function useView () {
  return useContext(ViewContext);
}


export function useViewDispatch () {
  return useContext(ViewDispatchContext);
}


function viewReducer (view, action) {
  switch (action.type) {
    case 'switched_view': {
      return action.nextView.type === 'default'
        ? getDefaultView()
        : action.nextView
    }
    case 'toggled_form': {
      return {
        ...view, 
        newItemFormVisible: !view.newItemFormVisible
      }
    }
    case 'closed_form': {
      return {
        ...view,
        newItemFormVisible: false
      }
    } default: {
      throw Error(`Invalid action type: ${action.type}`);
    }
  }
}


function getDefaultView () {
  const defaultProject = getDefaultProject();
  return !!defaultProject 
    ? { type  : 'singleProject',
        itemId: defaultProject.id    
      }
    : { type  : 'about',
        itemId: null
      }
}