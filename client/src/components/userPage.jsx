import React, {useState} from 'react';
// import Button from '@mui/material/Button';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';


const UserPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <h1>UserName here</h1>
      <Menu />
    </div>
  )
}


export default UserPage;