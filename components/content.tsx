import * as React from "react";

export const A = (props) => <a className="black" {...props} />;
export const P = (props) => <p className="f4 lh-copy" {...props} />;

const Content = ({ children, className = "" }) => (
  <article
    className={
      "overflow-y-scroll absolute absolute--fill flex-auto flex flex-column items-center pv5 " +
      className
    }
  >
    <div className="mw7">{children}</div>
  </article>
);

export default Content;
