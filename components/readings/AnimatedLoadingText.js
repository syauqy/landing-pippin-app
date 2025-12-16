import { useState, useEffect } from "react";

export const AnimatedLoadingText = ({ messages }) => {
  const [loadingText, setLoadingText] = useState(messages[0].text);
  const [emoji, setEmoji] = useState(messages[0].emoji);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % messages.length;
      setLoadingText(messages[index].text);
      setEmoji(messages[index].emoji);
    }, 5000); // Change text every 2.5 seconds

    return () => clearInterval(interval);
  }, [messages]);

  return (
    <div className="text-center py-4 space-y-2">
      <div className="text-4xl">{emoji}</div>
      <p className="text-gray-600">{loadingText}</p>
    </div>
  );
};
