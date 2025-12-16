import React from "react";
import { ArrowLeft, CircleAlertIcon } from "lucide-react";

export function ErrorLayout({ error, router }) {
  return (
    <div className="flex flex-col gap-4 items-center justify-center bg-base-100 text-base-content p-4">
      <div className="alert bg-red-50 text-red-500 max-w-md text-center">
        <div className="flex flex-col gap-3 text-center items-center">
          <CircleAlertIcon className="h-10 w-10" />
          <div className="text-center">Error! {error}</div>
        </div>
      </div>
    </div>
  );
}
