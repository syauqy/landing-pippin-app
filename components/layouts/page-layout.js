import * as React from "react";

export const PageLayout = ({ children }) => {
  return (
    <section className="flex flex-col flex-1 min-h-screen scroll-smooth overflow-hidden">
      {children}
    </section>
  );
};
