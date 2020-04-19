import * as React from "react";

export const A = (props) => <a className="black" {...props} />;
export const P = (props) => <p {...props} />;
export const SectionHeader = ({ title }) =>
  <>
    <h3 className="i f4 ma0 mt5">{title}</h3>
    <hr className="b--black" />
  </>

export const Ref = ({ id }) =>
  <sup>
    <a className="black" href={`#note-${id}`}>
      [{id}]
    </a>
  </sup>

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
