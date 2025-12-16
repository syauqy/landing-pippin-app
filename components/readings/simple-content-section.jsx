import clsx from "clsx";
import Markdown from "markdown-to-jsx";

export function SimpleContentSection({ className, reading }) {
  return (
    <Markdown
      className={clsx("text-gray-700", className)}
      options={{
        overrides: {
          p: {
            props: {
              className: "pb-4 last:pb-0",
            },
          },
          li: {
            props: {
              className: "pb-2 last:pb-0",
            },
          },
        },
      }}
    >
      {reading?.replace(/—/gi, ", ")}
    </Markdown>
  );
}
