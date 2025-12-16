// components/Layout.jsx
import React from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
/**
 * A simple layout wrapper that constrains the width to simulate a mobile view,
 * centered on the screen.
 */
const Layout = ({ children }) => {
  return (
    // Outer container: full viewport height, centers the content vertically and horizontally
    // On larger screens, the gray background shows outside the mobile view area.
    <div
      className={`min-h-screen flex flex-col items-center justify-start bg-gray-100 ${inter.className}`}
    >
      {/* Mobile view container */}
      {/* - w-full: Takes full width available from parent */}
      {/* - max-w-md: Limits maximum width (512px by default in Tailwind) - adjust as needed (sm: 384px, lg: 640px) */}
      {/* - flex-grow: Allows this container to grow and take available vertical space */}
      {/* - bg-white: Sets the background for the "app screen" area */}
      {/* - shadow-lg: Adds a subtle shadow effect, more visible on larger screens */}
      <main className="w-full max-w-md flex-grow bg-white shadow-lg flex flex-col">
        {/* The actual page content passed as children will be rendered here */}
        {/* Adding flex-grow here ensures content area tries to fill space */}
        <div className="flex-grow">{children}</div>
        {/* You could add a consistent footer inside the 'main' element here if needed */}
      </main>
    </div>
  );
};

export default Layout;
