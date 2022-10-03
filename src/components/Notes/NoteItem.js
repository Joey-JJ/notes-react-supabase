import React from "react";

const NoteItem = ({ note, deleteHandler }) => {
  return (
    <div>
      <h3>{note.title}</h3>
      <p>{note.contents}</p>
      <button onClick={() => deleteHandler(note.id)}>Delete</button>
    </div>
  );
};

export default NoteItem;
