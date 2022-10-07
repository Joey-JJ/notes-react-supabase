import React, { useState } from "react";
import { supabase } from "../utils/supabaseClient";

import { Container, Typography, TextField, Button, Paper } from "@mui/material";

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
    <Container
      maxWidth={"sm"}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "2rem",
        marginBlock: "10em",
      }}
    >
      <Paper
        variant="outlined"
        elevation={6}
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Typography variant="h4" component="h1">
          Please enter your e-mail address to sign in!
        </Typography>
        <form
          onSubmit={submitHandler}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <label htmlFor="email" style={{ display: "none" }}>
            E-mail address
          </label>
          <TextField
            variant="outlined"
            label="email"
            id="email"
            required
            type="E-mail"
            placeholder="Enter here..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <Button
            variant="outlined"
            type="submit"
            disabled={loading}
            size="large"
          >
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
