import { useEffect } from "react";
import { App } from "@capacitor/app";
import { supabase } from "@/utils/supabaseClient";
import { closeBrowser } from "@/utils/native-browser";

export const DeepLinkHandler = () => {
  useEffect(() => {
    const handleDeepLink = async ({ url }) => {
      console.log("Deep link opened:", url);

      // Close the in-app browser immediately
      await closeBrowser();

      const hash = new URL(url).hash;
      if (!hash) return;

      const params = new URLSearchParams(hash.substring(1)); // remove '#'
      const accessToken = params.get("access_token");
      const refreshToken = params.get("refresh_token");

      if (accessToken && refreshToken) {
        console.log("Found tokens in URL, setting session...");
        const { error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });

        if (error) {
          console.error("Error setting session from deep link:", error);
        }
      }
    };

    const listener = App.addListener("appUrlOpen", handleDeepLink);

    return () => listener.remove();
  }, []);

  return null; // This component does not render anything
};
