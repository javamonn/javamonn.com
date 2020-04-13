import * as React from "react";

const Link = ({ children }) => 
  <a className="db f2 b underline i ttu">{children}</a>

const Sidebar = () => (
  <div className="flex flex-column justify-end pl5 pr6 pb5 h-100">
    <Link>Blog</Link>
    <Link>Work</Link>
    <Link>Github</Link>
    <Link>Contact</Link>
  </div>
);

export default Sidebar
