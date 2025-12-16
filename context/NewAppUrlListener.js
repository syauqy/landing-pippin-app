import { App } from "@capacitor/app";
import { useEffect } from "react";
import Router from "next/router";
import { supabase } from "@/utils/supabaseClient";
import { Capacitor } from "@capacitor/core";
import { closeBrowser } from "@/utils/native-browser";

export function NewAppUrlListener() {
  const router = Router;

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) {
      return;
    }

    const listener = App.addListener("appUrlOpen", async (event) => {
      console.log("NewAppUrlListener: App opened with URL:", event.url);

      if (event.url.includes("#access_token=")) {
        await closeBrowser();

        const hash = new URL(event.url).hash;
        if (!hash) return;

        const params = new URLSearchParams(hash.substring(1));
        const accessToken = params.get("access_token");
        const refreshToken = params.get("refresh_token");

        if (accessToken && refreshToken) {
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          if (error) {
            console.error(
              "NewAppUrlListener: Error setting session from deep link:",
              error
            );
          }
          router.push("/home");
        }
      }
    });

    return () => listener.remove();
  }, [router]);

  return null;
}
