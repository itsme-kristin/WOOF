import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav>
      <h1>Logo</h1>
      <ul>
        <Link to='/'>
          <li>Home</li>
        </Link>
        <Link to='/research'>
          <li>Research Breeds</li>
        </Link>
        <Link to='/user'>
          <li>User</li>
        </Link>
        {/* <Link>
        </Link> */}
      </ul>
    </nav>
  )
}
//check out material ui's avatar component mixed with the menu component

export default Header;