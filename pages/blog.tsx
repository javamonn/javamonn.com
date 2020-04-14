import * as React from "react";

import Sidebar from "../components/sidebar";
import Content from "../components/content";
import Link from "next/link";

const Post = ({ title, description, date, href }) => (
  <Link href={href}>
    <a className="black no-underline">
      <div className="flex flex-row justify-between items-center">
        <h3 className="i f4 ma0">{title}</h3>
        <span className="f5">{date}</span>
      </div>
      <p className="f4">{description}</p>
      <hr />
    </a>
  </Link>
);

const Blog = () => (
  <div className="bg-white sans-serif vh-100 vw-100 flex">
    <Sidebar />
    <Content className="pv5">
      <Post
        title="Automatic Analytics"
        description="Analytics within early stage products, like the product itself, are necessarily iterative. What if you could scaffold event reporting from the core business logic?"
        date="April 14 2020"
        href="blog/automatic-analytics"
      />
    </Content>
  </div>
);

export default Blog;
