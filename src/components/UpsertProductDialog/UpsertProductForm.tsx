import TextField from "@mui/material/TextField";
import { MenuItem, Select } from "@mui/material";
import * as React from "react";
import { FC, useState } from "react";
import { IProduct } from "@/models/product.model";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";

export const UpsertProductForm: FC<{
  currentValue?: Partial<IProduct>;
  onSave: (value: Partial<IProduct>) => void;
  onCancel: () => void;
}> = ({ currentValue, onCancel, onSave }) => {
  const [formValue, setFormValue] = useState(currentValue || {});
  const { title, description, price, category } = formValue;

  function updateForm({ name, value }: { name: string; value: string }) {
    setFormValue((formValue) => ({ ...formValue, [name]: value }));
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave(formValue);
      }}
    >
      <section>
        <TextField
          autoFocus
          margin="dense"
          name="title"
          label="Title"
          type="text"
          value={title}
          onChange={(e) => updateForm(e.target)}
          variant="standard"
        />
        <TextField
          autoFocus
          margin="dense"
          name="decription"
          label="Description"
          multiline
          type="text"
          value={description}
          onChange={(e) => updateForm(e.target)}
          variant="standard"
        />
        <TextField
          autoFocus
          margin="dense"
          name="price"
          label="Price"
          type="number"
          value={price}
          onChange={(e) => updateForm(e.target)}
          variant="standard"
        />
        <Select
          name="category"
          value={category}
          label="Category"
          onChange={(e) => updateForm(e.target)}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </section>
      <DialogActions>
        <Button type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </DialogActions>
    </form>
  );
};
