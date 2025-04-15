import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  AllCommunityModule,
  ModuleRegistry,
  ColDef,
  ICellRendererParams,
  themeMaterial,
} from "ag-grid-community";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Addcar from "./AddCar";
import { Car } from "./types";
import EditCar from "./EditCar";

ModuleRegistry.registerModules([AllCommunityModule]);

export default function Carlist() {
  const [cars, setCars] = useState<Car[]>([]);
  const [open, setOpen] = useState(false);

  const [columnDefs] = useState<ColDef<Car>[]>([
    { field: "brand", sortable: true, filter: true, width: 150 },
    { field: "model", sortable: true, filter: true, width: 150 },
    { field: "color", sortable: true, filter: true, width: 150 },
    { field: "fuel", sortable: true, filter: true, width: 150 },
    { field: "modelYear", sortable: true, filter: true, width: 120 },
    { field: "price", sortable: true, filter: true, width: 120 },
    {
      width: 120,
      cellRenderer: (params: ICellRendererParams) => (
        <EditCar data={params.data} fetchCars={fetchCars} />
      ),
    },
    {
      width: 150,
      cellRenderer: (params: ICellRendererParams) => (
        <Button
          variant="outlined"
          size="small"
          color="error"
          onClick={() => deleteCar(params)}
        >
          Delete
        </Button>
      ),
    },
  ]);

  useEffect(() => {
    fetchCars();
  }, []);

  const deleteCar = (params: ICellRendererParams) => {
    if (window.confirm("Are you sure?")) {
      fetch(params.data._links.car.href, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) throw new Error("Error while deleting car");

          return response.json();
        })
        .then(() => fetchCars())
        .then(() => setOpen(true))
        .catch((error) => console.error(error));
    }
  };

  const fetchCars = () => {
    fetch(import.meta.env.VITE_API_URL)
      .then((response) => {
        if (!response.ok) throw new Error("Error while fetching cars");

        return response.json();
      })
      .then((data) => setCars(data._embedded.cars))
      .catch((error) => console.error(error));
  };
  return (
    <>
      <div style={{ height: 500 }}>
        <Addcar fetchCars={fetchCars} />
        <AgGridReact
          rowData={cars}
          columnDefs={columnDefs}
          theme={themeMaterial}
        />
      </div>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
        message="Car deleted"
      />
    </>
  );
}
