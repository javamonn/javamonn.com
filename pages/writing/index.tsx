import * as React from "react";

import fs from "fs";
import path from "path";

import Sidebar from "../../components/sidebar";
import Content from "../../components/content";
import Link from "next/link";

const Blog = ({ posts }) => (
  <div className="bg-white sans-serif vh-100 vw-100 flex">
    <Sidebar />
    <Content>
      {posts.map(({ title, href, description, date }) => (
        <React.Fragment key={href}>
          <Link href={href}>
            <a className="black no-underline">
              <div className="flex flex-column flex-row-l justify-between-l items-center-l">
                <h3 className="i f4 mb1 mb0-l ma0">{title}</h3>
                <time className="f5">{date}</time>
              </div>
              <p className="f4">{description}</p>
            </a>
          </Link>
          <hr className="b--black" />
        </React.Fragment>
      ))}
    </Content>
  </div>
);

export const getStaticProps = (context) => {
  const dirname = path.join(process.cwd(), "pages/writing");
  const posts = fs
    .readdirSync(dirname)
    .filter((name) => name !== "index.tsx")
    .map((name) => {
      const { title, date, description } = require(`./${name}`);
      const href = `writing/${path.basename(name, ".tsx")}`;
      return { title, href, description, date };
    });
  return { props: { posts } };
};

export default Blog;
