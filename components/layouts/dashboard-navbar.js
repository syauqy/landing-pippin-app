import React from "react";
import clsx from "clsx";

export function DashboardNavbar({ user, handleLogout, showTitleInNavbar }) {
  return (
    <nav
      className={clsx(
        "navbar min-h-[50px] w-full px-5 sticky top-0 left-0 z-10 ",
        showTitleInNavbar ? "border-b border-batik-border bg-base-100" : ""
      )}
    >
      <div className="navbar-start"></div>
      <div className="navbar-center flex items-center">
        {showTitleInNavbar && (
          <div className="text-sm text-batik-text font-bold uppercase tracking-widest">
            Wetonscope
          </div>
        )}
      </div>
      <div className="navbar-end">
        {/* <Link
          href="/connections"
          className="p-2 rounded-full text-xl border border-batik-text hover:bg-batik/80 hover:cursor-pointer"
        >
          <Users2Icon size={15} className="text-batik-text" />
        </Link> */}
      </div>
    </nav>
  );
}
