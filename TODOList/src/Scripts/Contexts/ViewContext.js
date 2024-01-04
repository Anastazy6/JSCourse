import React, {
  createContext,
  useContext,
  useReducer
} from "react";

import { getDefaultView } from "../Shared/helpers";

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
  console.log("Logging action ***********************")
  console.log(action);
  console.log("Logging action ***********************")

  switch (action.type) {
    case 'switched_view': {
      return action.nextView.type === 'default'
        ? getDefaultView()
        : action.nextView
    } default: {
      throw Error(`Invalid action type: ${action.type}`);
    }
  }
}

