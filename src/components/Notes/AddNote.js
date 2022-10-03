import React, { useState, useContext } from "react";
import { supabase } from "../../utils/supabaseClient";
import { sessionContext } from "../../utils/sessionContext";

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
    <form onSubmit={submitHandler}>
      <label htmlFor="title">Title</label>
      <input
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor="contents">Contents</label>
      <textarea
        id="contents"
        value={contents}
        onChange={(e) => setContents(e.target.value)}
      ></textarea>
      <button type="submit">Create note</button>
    </form>
  );
};

export default AddNote;
