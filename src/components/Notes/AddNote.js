import React, { useState, useContext } from "react";
import { supabase } from "../../utils/supabaseClient";
import { sessionContext } from "../../utils/sessionContext";

import { Container, TextField, Button } from "@mui/material";

const AddNote = () => {
  const { session } = useContext(sessionContext);
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    if (title && contents) {
      const { error } = await supabase
        .from("notes")
        .insert([
          { title: title, contents: contents, user_id: session.user.id },
        ]);

      if (error) throw error;
    }

    setTitle("");
    setContents("");
  };

  return (
    <Container maxWidth="lg" align="center" sx={{ mb: "2rem" }}>
      <form
        onSubmit={submitHandler}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          maxWidth: "25em",
        }}
      >
        <TextField
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          size="small"
          label="Title"
        />

        <TextField
          id="contents"
          value={contents}
          onChange={(e) => setContents(e.target.value)}
          required
          multiline
          size="small"
          label="Contents"
        />
        <Button type="submit" variant="outlined">
          Create note
        </Button>
      </form>
    </Container>
  );
};

export default AddNote;
