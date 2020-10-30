import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import Logo from './Logo';
import './Sidebar.css';
import SidebarItems from './SidebarItems';


function Sidebar(props) {
    const location = props.history.location;
    const lastActiveIndexString = localStorage.getItem("lastActiveIndex");
    const lastActiveIndex = Number(lastActiveIndexString);
    const [activeIndex, setActiveIndex] = useState(lastActiveIndex || 0);

    function changeActiveIndex(newIndex) {
        localStorage.setItem("lastActiveIndex", newIndex);
        setActiveIndex(newIndex);
        props.onChange(SidebarItems[newIndex]);
    }

    function getPath(path) {
        if (path.charAt(0) !== "/") {
            return "/" + path;
        }
        return path;
    }

    useEffect(() => {
        const activeItemIdx = SidebarItems.findIndex(item => getPath(location.pathname).indexOf(getPath(item.route))>=0)
        changeActiveIndex(activeItemIdx);

    }, [location])

    return (
        <SidebarParent>
            <div className="sidebar-fixed">
                <Logo/>
                {
                    SidebarItems.map((item, idx) => {
                        return (
                            <Link to={item.route} key={idx}>
                                <SidebarItem key={item.name} active={idx === activeIndex}>
                                    <p>{item.name}</p>
                                </SidebarItem>
                            </Link>
                        );
                    })
                }
            </div>
        </SidebarParent>
    );
}

export default Sidebar;

const SidebarParent = styled.div`
  background: #212427;
  
  a {
    text-decoration: none;
  }
  
  & > div {
    width: 250px;
    height: 100vh;
  }
  
  .behind-the-scenes {
    width: 250px;
    
  }
`;

const SidebarItem = styled.div`
  padding: 8px 24px;
  transition: all 0.25s ease-in-out;
  background: ${props => props.active ? "#3C3F42" : ""};
  p {
    color: white;
    font-weight: bold;
    text-decoration: none;
  }
  
  &:hover {
    cursor:pointer;
  }
  
  &:hover:not(:first-child) {
    background: #c34a36;
  }
`;