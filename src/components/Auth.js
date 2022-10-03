import React, { useState } from "react";
import { supabase } from "../utils/supabaseClient";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

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
    <Card sx={{ minWidth: 275 }}>
      <Typography variant="h5" component="div">
        Please enter your e-mail address to sign in!
      </Typography>
      <form onSubmit={submitHandler}>
        <label htmlFor="email">E-mail address</label>
        <TextField
          variant="outlined"
          label="email"
          id="email"
          type="email"
          placeholder="Enter here..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        <Button variant="outlined" type="submit" disabled={loading}>
          Sign in
        </Button>
      </form>
    </Card>
  );
};

export default Auth;
