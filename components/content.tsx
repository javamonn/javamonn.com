import * as React from "react";

export const A = (props) => <a className="black" {...props} />;
export const P = (props) => <p {...props} />;

const Content = ({ children, className = "" }) => (
  <main
    className={
      "overflow-y-scroll absolute absolute--fill flex-auto flex flex-column items-center pv5 " +
      className
    }
  >
    <div className="ph4 ph0-l mw7-l w-100">{children}</div>
  </main>
);

export default Content;
