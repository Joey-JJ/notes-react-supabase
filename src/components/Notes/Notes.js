import React, { useState, useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";

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
    <div>
      <AddNote />
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} deleteHandler={deleteHandler} />
      ))}
    </div>
  );
};

export default Notes;
