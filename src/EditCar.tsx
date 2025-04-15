import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Car, CarData } from "./types";

type EditCarProps = {
  fetchCars: () => void;
  data: CarData;
};

export default function EditCar(props: EditCarProps) {
  const [open, setOpen] = useState(false);
  const [car, setCar] = useState<Car>({
    brand: props.data.brand,
    model: props.data.model,
    color: props.data.color,
    fuel: props.data.fuel,
    modelYear: props.data.modelYear,
    price: props.data.price,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = () => {
    fetch(props.data._links.car.href, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(car),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Error while editing car");

        return response.json();
      })
      .then(() => props.fetchCars())
      .then(() => handleClose())
      .then((err) => console.log(err));
  };

  return (
    <>
      <Button
        style={{ margin: 10 }}
        variant="outlined"
        onClick={handleClickOpen}
        color="success"
        size="small"
      >
        Edit Car
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Car</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            name="brand"
            value={car.brand}
            onChange={(e) => setCar({ ...car, brand: e.target.value })}
            label="Brand"
            fullWidth
          />
          <TextField
            required
            margin="dense"
            name="model"
            value={car.model}
            onChange={(e) => setCar({ ...car, model: e.target.value })}
            label="Model"
            fullWidth
          />
          <TextField
            required
            margin="dense"
            name="color"
            value={car.color}
            onChange={(e) => setCar({ ...car, color: e.target.value })}
            label="Color"
            fullWidth
          />
          <TextField
            required
            margin="dense"
            name="fuel"
            value={car.fuel}
            onChange={(e) => setCar({ ...car, fuel: e.target.value })}
            label="Fuel"
            fullWidth
          />
          <TextField
            required
            margin="dense"
            name="modelYear"
            value={car.modelYear}
            onChange={(e) =>
              setCar({ ...car, modelYear: Number(e.target.value) })
            }
            label="Model Year"
            fullWidth
          />
          <TextField
            required
            margin="dense"
            name="price"
            value={car.price}
            onChange={(e) => setCar({ ...car, price: Number(e.target.value) })}
            label="Price"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button color="error" style={{ margin: 10 }} onClick={handleClose}>
            Cancel
          </Button>
          <Button
            color="success"
            style={{ margin: 10 }}
            onClick={() => handleEdit()}
          >
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
