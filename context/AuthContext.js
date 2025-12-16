// context/AuthContext.js
import { createContext, useState, useEffect, useContext, useRef } from "react"; // Added useRef
import { supabase } from "@/utils/supabaseClient";
// import { useRouter } from "next/router";

const AuthContext = createContext(undefined);

// Timeout duration in milliseconds (e.g., 10 seconds)
const OAUTH_REDIRECT_TIMEOUT = 10000;

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Start true
  const timeoutRef = useRef(null); // Ref to store timeout ID
  // const router = useRouter();

  useEffect(() => {
    // console.log("AuthProvider Mounted. Initial loading state:", loading);

    let authListener = null;
    let initialCheckCompleted = false;

    const isOAuthRedirect =
      typeof window !== "undefined" &&
      /access_token|refresh_token|provider_token|error_description/.test(
        window.location.hash
      );
    // console.log(
    //   "AuthProvider checking for OAuth redirect hash:",
    //   isOAuthRedirect
    // );

    // Function to clear any existing timeout
    const clearTimeoutIfSet = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
        // console.log("AuthProvider OAuth timeout cleared.");
      }
    };

    const handleAuthStateChange = (_event, session) => {
      // console.log(
      //   "AuthProvider onAuthStateChange event:",
      //   _event,
      //   "session:",
      //   !!session
      // );

      // An event occurred, clear any pending timeout
      clearTimeoutIfSet();

      setSession(session);
      setUser(session?.user ?? null);

      if (!initialCheckCompleted) {
        // This is the first event received after mount.
        if (!isOAuthRedirect || session) {
          // Not an OAuth redirect, OR it is but we got a session immediately.
          setLoading(false);
          initialCheckCompleted = true;
          // console.log(
          //   "AuthProvider First event (non-OAuth or session found), initial check complete, setLoading(false)"
          // );
        } else {
          // IS an OAuth redirect, and the first event has NO session. Keep loading.
          // console.log(
          //   "AuthProvider First event IS OAuth redirect with NO session, keeping loading=true, waiting for token processing."
          // );
          // Set a timeout ONLY if we are keeping loading=true due to OAuth redirect
          if (!timeoutRef.current) {
            // Avoid setting multiple timeouts
            timeoutRef.current = setTimeout(() => {
              // console.warn(
              //   `AuthProvider OAuth redirect timeout (${OAUTH_REDIRECT_TIMEOUT}ms) reached! Forcing loading=false.`
              // );
              // Check if still loading before setting to false, avoids race conditions
              if (loading) {
                setLoading(false);
              }
              initialCheckCompleted = true; // Mark check as completed (by timeout)
              timeoutRef.current = null;
            }, OAUTH_REDIRECT_TIMEOUT);
            // console.log("AuthProvider OAuth timeout set.");
          }
        }
      } else {
        // This is a subsequent event. Ensure loading is false.
        if (loading) {
          setLoading(false);
          // console.log(
          //   "AuthProvider Subsequent event received, ensuring loading is false."
          // );
        }
        // console.log("AuthProvider Subsequent auth state event received.");
      }
    };

    // 1. Set up the listener immediately.
    const { data: listener } = supabase.auth.onAuthStateChange(
      handleAuthStateChange
    );
    authListener = listener; // Store the listener subscription

    // 2. Attempt to get the current session *after* setting up the listener.
    supabase.auth
      .getSession()
      .then(({ data: { session: initialSession } }) => {
        // console.log(
        //   "AuthProvider initial getSession result:",
        //   !!initialSession
        // );
        // If the listener hasn't completed the initial check yet AND we find a session,
        // update the state AND mark loading as false (session found = check complete).
        if (!initialCheckCompleted && initialSession) {
          console.log(
            "AuthProvider setting state based on initial getSession (before first listener event)"
          );
          clearTimeoutIfSet(); // Found session, no need for timeout
          setSession(initialSession);
          setUser(initialSession.user ?? null);
          setLoading(false); // We have the state, stop loading
          initialCheckCompleted = true;
          console.log(
            "AuthProvider getSession found user, setting loading=false and check complete."
          );
        }
      })
      .catch((error) => {
        console.error("Error in initial getSession:", error);
        // If getSession fails, rely on the listener/timeout logic.
        // Only force loading false here if it's NOT an OAuth redirect,
        // otherwise, let the timeout handle the OAuth case.
        if (loading && !isOAuthRedirect) {
          console.warn(
            "AuthProvider getSession failed on non-OAuth page, setting loading=false as fallback."
          );
          clearTimeoutIfSet(); // Clear timeout on error too
          setLoading(false);
          initialCheckCompleted = true;
        } else if (loading && isOAuthRedirect) {
          console.warn(
            "AuthProvider getSession failed during OAuth redirect, relying on listener/timeout."
          );
        }
      });

    // Cleanup: Unsubscribe listener and clear timeout
    return () => {
      console.log(
        "AuthProvider Unmounting, unsubscribing listener and clearing timeout."
      );
      authListener?.subscription?.unsubscribe(); // Ensure unsubscribe is called correctly
      clearTimeoutIfSet();
    };
  }, []); // Added loading to dependency array for the timeout logic safety

  // useEffect(() => {
  //   const {
  //     data: { subscription },
  //   } = supabase.auth.onAuthStateChange(async (event, session) => {
  //     setLoading(true);
  //     console.log(`Auth event: ${event}`);

  //     if (event === "SIGNED_IN" && session) {
  //       setUser(session.user);

  //       // Check if the user has a profile to decide where to redirect
  //       const { data: profile, error } = await supabase
  //         .from("profiles")
  //         .select("id, birth_date")
  //         .eq("id", session.user.id)
  //         .single();

  //       if (error && error.code !== "PGRST116") {
  //         // PGRST116 means no rows found, which is expected for new users
  //         console.error("Error checking profile:", error);
  //       }

  //       if (profile && profile.birth_date) {
  //         console.log("Profile found, redirecting to /home");
  //         router.replace("/home");
  //       } else {
  //         console.log("No profile found, redirecting to /profile-setup");
  //         router.replace("/profile-setup");
  //       }
  //     } else if (event === "SIGNED_OUT") {
  //       setUser(null);
  //       router.replace("/");
  //     }
  //     setLoading(false);
  //   });

  //   // Also check for initial session on app load
  //   const checkInitialSession = async () => {
  //     const {
  //       data: { session },
  //     } = await supabase.auth.getSession();
  //     if (session) {
  //       setUser(session.user);
  //     }
  //     setLoading(false);
  //   };

  //   checkInitialSession();

  //   return () => {
  //     subscription.unsubscribe();
  //   };
  // }, [router]);

  const logout = async () => {
    console.log("AuthProvider logout called");
    // await supabase.auth.signOut();
    const { error } = await supabase.auth.signOut();
    if (error && error.code !== "session_not_found") {
      console.error("Unexpected error during sign out:", error.message);
      // You might want to show a notification to the user here
    }
    // State updates happen via the listener
  };

  const value = {
    session,
    user,
    loading,
    logout,
  };

  // Render children ONLY when the initial loading is false.
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
  // return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
