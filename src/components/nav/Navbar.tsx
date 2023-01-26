import React from 'react';
import  '../../assets/CSS/NavBar.css';
import { Link } from 'react-router-dom';


interface Props {
  links: Array<{title:string, link:string}>;
}

const Navbar: React.FC<Props> = ({ links }) => {
  return (
    <nav>
      <ul>
        {links.map((link, index) => (
          <li key={index}>
            <Link to={link.link}>{link.title}</Link>
            <img src={"src\assets\images\logo 3.png"}></img>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
