import React, { useState } from 'react';
import Header from '../../views/header/Header';
import Sidebar from "../../views/sidebar/Sidebar";
import './Layout.css';

function Layout(props) {
  const [selectedPage, setSelectedPage] = useState("404 - Page not found");

  return (
    <div>
      <div className="layout-container">
        <Sidebar history={props.history} onChange={(page) => page && setSelectedPage(page.name)}/>
        <div className="layout-main">
          <Header title={selectedPage}/>
          {props.children}
        </div>
      </div>
    </div>
  );

}

export default Layout;