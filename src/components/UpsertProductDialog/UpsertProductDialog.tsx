import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { UpsertProductForm } from "@/components/UpsertProductDialog/UpsertProductForm";
import { IProduct } from "@/models/product.model";

export default function UpsertProductDialog({
  product,
  onProductUpdate,
}: {
  product?: IProduct;
  onProductUpdate: (
    updated: Partial<IProduct>,
    postRequest: () => void,
  ) => void;
}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton
        onClick={() => {
          handleClickOpen();
        }}
      >
        <EditIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <UpsertProductForm
            currentValue={product}
            onSave={(value) => onProductUpdate(value, () => handleClose())}
            onCancel={() => handleClose()}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
