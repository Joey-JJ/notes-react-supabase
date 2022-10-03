import React, { useState, useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";
import NoteItem from "./NoteItem";

const Notes = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const { data, error } = await supabase.from("notes").select("*");

      if (error) throw error;

      setNotes(data.map((note) => <NoteItem key={note.id} note={note} />));
    };

    fetchNotes();
  }, []);

  return <div>{notes}</div>;
};

export default Notes;
