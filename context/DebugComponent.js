import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";

export const DebugComponent = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.log(error);
      } else {
        setUser(data.user);
      }
    };
    getUser();
  }, [supabase]);

  return (
    <div id="debug">
      <h2>Debug Info:</h2>
      <p>User</p>
      <pre>{JSON.stringify(user ?? {}, null, 2)}</pre>
    </div>
  );
};
