import React, { useEffect, useState } from "react";
import { supabase } from "./utils/supabaseClient";
import { sessionContext } from "./utils/sessionContext";
import Auth from "./components/Auth";
import Notes from "./components/Notes";

const App = () => {
  const [session, setSession] = useState(null);

  // useEffect(() => {
  //   const fetchSession = async () => {
  //     const { data, error } = await supabase.auth.getSession();

  //     if (error) throw error;

  //     setSession(data);

  //     supabase.auth.onAuthStateChange((_event, session) => {
  //       setSession(session);
  //     });
  //   };
  //   console.log("session", session);
  //   fetchSession();
  // }, []);

  return (
    <sessionContext.Provider value={session}>
      <div className="App">{session ? <Notes /> : <Auth />}</div>
    </sessionContext.Provider>
  );
};

export default App;
