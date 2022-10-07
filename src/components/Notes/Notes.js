import React, { useState, useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";

import { Container, Grid } from "@mui/material";

const Notes = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const { data, error } = await supabase.from("notes").select("*");

      if (error) throw error;

      setNotes(data);
    };

    fetchNotes();
  }, [notes]);

  const deleteHandler = async (id) => {
    const { error } = await supabase.from("notes").delete().match({ id: id });

    if (error) throw error;

    setNotes((prevState) => prevState.filter((note) => note.id !== id));
  };

  return (
    <main>
      <AddNote />
      <Container maxWidth="md">
        <Grid container spacing={4}>
          {notes.map((note) => (
            <Grid item key={note.id} xs={12} sm={6} md={4}>
              <NoteItem
                key={note.id}
                note={note}
                deleteHandler={deleteHandler}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </main>
  );
};

export default Notes;
