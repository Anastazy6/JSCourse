import "../Styles/styles.scss";

import { createRoot } from 'react-dom/client';
import React, { StrictMode }  from "react";

import Contents from "./Shared/Contents";
import Footer   from "./Shared/Footer";

import { ViewProvider } from "./Contexts/ViewContext";

document.addEventListener('DOMContentLoaded', () => {
  const root = createRoot(document.getElementById('react-root'));

  root.render(
    <StrictMode>
      <ViewProvider>
        <div id='content'>
          <Contents />
          <Footer   />
        </div>
      </ViewProvider>
    </StrictMode>
  );
});