import React, { useState, useEffect } from "react";
import { supabase } from "./utils/supabaseClient";
import { sessionContext } from "./utils/sessionContext";
import Auth from "./components/Auth";
import Notes from "./components/Notes/Notes";
import Navbar from "./components/UI/Navbar";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (mounted) {
        if (session) {
          setSession(session);
        }

        setIsLoading(false);
      }
    };

    fetchSession();

    const { subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <sessionContext.Provider value={{ session, setSession }}>
      <Navbar />
      <div className="App">{session ? <Notes /> : <Auth />}</div>
    </sessionContext.Provider>
  );
};

export default App;
