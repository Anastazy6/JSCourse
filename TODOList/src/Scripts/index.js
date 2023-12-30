import "../Styles/styles.scss";

import { createRoot } from 'react-dom/client';
import React, { StrictMode }  from "react";

import Contents from "./Shared/Contents";
import Navbar   from "./Shared/Navbar";
import Footer   from "./Shared/Footer";

document.addEventListener('DOMContentLoaded', () => {
  const root = createRoot(document.getElementById('react-root'));

  root.render(
    <StrictMode>
      <div id='content'>
        <Navbar   />
        <Contents />
        <Footer   />
      </div>
    </StrictMode>
  );
});