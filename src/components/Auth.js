import React, { useState } from "react";
import { supabase } from "../utils/supabaseClient";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) throw error;
      alert("Check your email for the login link!");
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Please enter your e-mail address to sign in!</h1>
      <form onSubmit={submitHandler}>
        <label htmlFor="email">E-mail address</label>
        <input
          id="email"
          type="email"
          placeholder="Enter here..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Auth;
