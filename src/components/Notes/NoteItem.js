import React from "react";

const NoteItem = ({ note }) => {
  return (
    <div>
      <h3>{note.title}</h3>
      <p>{note.contents}</p>
    </div>
  );
};

export default NoteItem;
