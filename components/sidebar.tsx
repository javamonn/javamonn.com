import * as React from "react";
import cn from "classnames";
import NextLink from "next/link";
import { useRouter } from "next/router";

const Link = ({ children, href, relative = false, active = false }) => {
  const className = active
    ? "f2 b i no-underline ttu white bg-black pa2 pointer"
    : "f2 b underline i ttu black pa2 pointer";

  return (
    <div
      className="mt2 pa2"
      onClick={(ev) => {
        ev.stopPropagation();
      }}
    >
      {relative ? (
        <NextLink href={href}>
          <a className={className}>{children}</a>
        </NextLink>
      ) : (
        <a className={className} href={href}>
          {children}
        </a>
      )}
    </div>
  );
};

const Sidebar = () => {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <div
        onClick={() => setOpen(!open)}
        className="dn-xl absolute right-0 top-0 mr4 mt3 z-1"
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="32" height="32" fill="black" />
          <line y1="10.5" x2="32" y2="10.5" stroke="white" />
          <line y1="21.5" x2="32" y2="21.5" stroke="white" />
        </svg>
      </div>
      <nav
        onClick={() => setOpen(false)}
        className={cn(
          "dn flex-xl flex-column justify-end pl4 pb4 pl5-ns pb5-ns h-100 z-1",
          open ? "flex bg-white w-100" : "bg-transparent"
        )}
      >
        <Link
          href="/writing"
          relative={true}
          active={router.pathname === "/writing"}
        >
          Writing
        </Link>
        <Link href="/work" relative={true} active={router.pathname === "/work"}>
          Work
        </Link>
        <Link href="https://github.com/javamonn">Github</Link>
        <Link href="mailto:javamonn@hey.com">Contact</Link>
      </nav>
    </>
  );
};

export default Sidebar;
