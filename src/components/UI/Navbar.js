import React, { useContext } from "react";
import { supabase } from "../../utils/supabaseClient";
import { sessionContext } from "../../utils/sessionContext";

const Navbar = () => {
  const { session } = useContext(sessionContext);

  return (
    <nav style={{ display: "flex", justifyContent: "space-between" }}>
      <h1>Notes app</h1>
      {session && (
        <div>
          <div>{session.user.email}</div>
          <button onClick={async () => await supabase.auth.signOut()}>
            Sign out
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
