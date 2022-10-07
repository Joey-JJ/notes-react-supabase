import React, { useState } from "react";
import { supabase } from "../../utils/supabaseClient";

import { Card, Typography, TextField, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";

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
    <Card
      align="center"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        maxWidth: "15rem",
        padding: "1rem",
      }}
    >
      {!editing && (
        <>
          <Typography variant="h6">{note.title}</Typography>
          <Typography variant="body1">{note.contents}</Typography>
        </>
      )}

      {editing && (
        <form
          onSubmit={submitHandler}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <TextField
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            size="small"
            variant="standard"
            label="title"
          />
          <TextField
            onChange={(e) => setContents(e.target.value)}
            value={contents}
            size="small"
            variant="standard"
            label="contents"
          />
          <Button type="submit">Save</Button>
        </form>
      )}

      <div>
        <IconButton onClick={() => deleteHandler(note.id)}>
          <DeleteIcon color="primary" variant="filled" />
        </IconButton>
        <IconButton onClick={() => setEditing((prevState) => !prevState)}>
          {editing ? (
            <CancelIcon color="primary" variant="filled" />
          ) : (
            <EditIcon color="primary" variant="filled" />
          )}
        </IconButton>
      </div>
    </Card>
  );
};

export default NoteItem;
