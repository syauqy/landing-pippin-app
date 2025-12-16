import React from "react";
import { ArrowLeft } from "lucide-react";

export function NavbarDetail({ title }) {
  return (
    <nav className="navbar min-h-[50px] bg-base-100 w-full px-5 sticky top-0 left-0 z-50 border-b border-batik-border">
      <div className="navbar-start">
        <button
          onClick={() => window.history.back()}
          className="p-2 rounded-full text-xl border border-batik-text hover:bg-batik/80 hover:cursor-pointer"
        >
          <ArrowLeft size={20} className="text-batik-text" />
        </button>
      </div>
      <div className="navbar-center flex items-center">
        <div className="text-sm text-batik-text font-bold uppercase tracking-widest">
          {title}
        </div>
      </div>
      <div className="navbar-end"></div>
    </nav>
  );
}
