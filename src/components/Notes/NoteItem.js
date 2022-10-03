import React, { useState } from "react";
import { supabase } from "../../utils/supabaseClient";

const NoteItem = ({ note, deleteHandler }) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [contents, setContents] = useState(note.contents);

  const submitHandler = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from("notes")
      .update({ title: title, contents: contents })
      .eq("id", note.id);

    if (error) throw error;

    setEditing(false);
  };

  return (
    <div>
      {!editing && (
        <>
          <h3>{note.title}</h3>
          <p>{note.contents}</p>
        </>
      )}

      {editing && (
        <form onSubmit={submitHandler}>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea onChange={(e) => setContents(e.target.value)}>
            {contents}
          </textarea>
          <button type="submit">Save</button>
        </form>
      )}

      <button onClick={() => deleteHandler(note.id)}>Delete</button>
      <button onClick={() => setEditing((prevState) => !prevState)}>
        {editing ? "Cancel" : "Edit"}
      </button>
    </div>
  );
};

export default NoteItem;
