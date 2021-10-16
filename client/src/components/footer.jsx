import React from 'react';
import { Link } from 'react-router-dom';

const tempStyle = {
  color: 'brown',
  position: 'fixed',
  bottom: 0,
}


const Header = () => {
  return (
    <nav style={tempStyle}>
      <h5>footer</h5>
    </nav>
  )
}
//check out material ui's avatar component mixed with the menu component

export default Header;