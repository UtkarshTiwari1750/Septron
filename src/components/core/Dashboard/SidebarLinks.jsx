import React from 'react'
import * as Icon1 from "react-icons/cg";
import * as Icon2 from 'react-icons/io5';
import * as Icon3 from "react-icons/vsc";
import * as Icon4 from "react-icons/rx";
import * as Icon5 from "react-icons/io";
import * as Icon6 from "react-icons/bi";
import { NavLink, matchPath, useLocation } from 'react-router-dom';

const SidebarLinks = ({iconName, link}) => {
    const Icon = Icon1[iconName] || Icon2[iconName] || Icon3[iconName] || 
    Icon4[iconName] || Icon5[iconName] || Icon6[iconName];

    const location = useLocation();

    const matchRoute = (route) => {
        return matchPath({path: route}, location.pathname);
    }
    return (
    <NavLink to={link.path}
        className={`p-4 ${matchRoute(link.path) 
            ? "bg-gradient-to-bl from-pink-700 to-purple-600 rounded-r-full text-yellow-200": ""}
            transition-all duration-200
        `}
    >
        <div className='flex gap-2 items-center'>
            <p>{link.name}</p>
            <Icon />
        </div>
        
    </NavLink>
  )
}

export default SidebarLinks