import { useState, useEffect } from "react";
import { SplashScreen as SplashScreenPlugin } from "@capacitor/splash-screen";

export const useSplashScreen = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const hideSplash = async () => {
      await SplashScreenPlugin.hide();
      setTimeout(() => {
        setShowSplash(false);
      }, 1000);
    };

    hideSplash();
    // showSplash();
  }, []);

  return { showSplash };
};
