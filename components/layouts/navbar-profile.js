import React from "react";
import { ArrowLeft, UsersIcon, Users2Icon } from "lucide-react";
import Link from "next/link";

export function NavbarProfile({ title }) {
  return (
    <nav className="navbar min-h-[50px] bg-base-100 w-full px-5 sticky top-0 left-0 z-50 border-b border-batik-border">
      <div className="navbar-start"></div>
      <div className="navbar-center flex items-center">
        <div className="text-sm text-batik-text font-bold uppercase tracking-widest">
          {title}
        </div>
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
