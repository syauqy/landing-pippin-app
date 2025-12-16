import React from "react";
import { App } from "@capacitor/app";
import { useEffect } from "react";
import Router from "next/router";
import { supabase } from "@/utils/supabaseClient";
import { Capacitor } from "@capacitor/core";

export function AppUrlListener() {
  const router = Router;

  useEffect(() => {
    // Check if we are already logged in (e.g., after web OAuth redirect)
    // supabase.auth.getSession().then(({ data: { session } }) => {
    //   if (session) {
    //     console.log(
    //       "User already logged in on page load, redirecting to home."
    //     );
    //     router.push("/home"); // Redirect to home if session exists
    //   }
    // });

    if (Capacitor.isNativePlatform()) {
      console.log("AppUrlListener: Native platform detected.");

      const listener = App.addListener("appUrlOpen", (event) => {
        console.log("App opened with URL:", event.url);
        if (event.url.includes("#access_token=")) {
          supabase.auth
            .getSessionFromUrl({ url: event.url })
            .then(({ data, error }) => {
              if (error) {
                console.error("Error getting session from URL:", error);
                setError("Failed to process login callback.");
              } else if (data.session) {
                console.log(
                  "Session established from URL (Capacitor):",
                  data.session
                );
                // Redirect on mobile after session is confirmed from deep link
                router.push("/home");
              } else {
                console.log(
                  "No session found in URL (Capacitor), or session already handled."
                );
              }
            });
        }
      });

      // Clean up Capacitor listener
      return () => {
        listener.remove();
      };
    }
  }, [router]);
  return <></>;
}
