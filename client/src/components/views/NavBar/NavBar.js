import React from 'react';
// import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenu';
import { TfiAlignJustify } from "react-icons/tfi";
// import { Drawer, Button } from 'antd';
import './Sections/Navbar.css';

function NavBar() {


  return (
   
<header>

  <h1><a href="/"> Favorite </a></h1>

  <input type="checkbox" id="menu-bar" />

  <label for="menu-bar"><TfiAlignJustify /></label>

  <nav>
      
      {/* <LeftMenu /> */}
      <RightMenu />

  </nav>


</header>
  
  )
}

export default NavBar