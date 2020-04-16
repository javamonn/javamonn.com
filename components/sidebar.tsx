import * as React from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";

const Link = ({ children, href, relative = false, active = false }) => {
  const className = active
    ? "f2 b i no-underline ttu white bg-black pa2 pointer"
    : "f2 b underline i ttu black pa2 pointer";

  return (
    <div className="mt2 pa2">
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

  return (
    <div className="flex flex-column justify-end pl5 pb5 h-100 z-1">
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
      <Link href="mailto:javamonn@gmail.com">Contact</Link>
    </div>
  );
};

export default Sidebar;
