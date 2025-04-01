import { useEffect, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  AllCommunityModule,
  ModuleRegistry,
  ColDef,
  ICellRendererParams,
} from "ag-grid-community";
import Button from "@mui/material/Button";

ModuleRegistry.registerModules([AllCommunityModule]);

export default function Carlist() {
  type Car = {
    brand: string;
    model: string;
    color: string;
    fuel: string;
    modelYear: number;
    price: number;
  };
  const [cars, setCars] = useState<Car[]>([]);

  const [columnDefs] = useState<ColDef<Car>[]>([
    { field: "brand" },
    { field: "model" },
    { field: "color" },
    { field: "fuel" },
    { field: "modelYear" },
    { field: "price" },
    {
      cellRenderer: (params: ICellRendererParams) => (
        <Button color="error" onClick={() => handleDelete(params)}>
          Delete
        </Button>
      ),
    },
  ]);

  const handleDelete = (params: ICellRendererParams) => {
    console.log(params.data._links.car.href);
    fetch(params.data._links.car.href, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) throw new Error("Error while deleting car");

        return response.json();
      })
      .then(() => fetchCars());
  };

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      sortable: true,
      filter: true,
      width: 150,
    };
  }, []);

  useEffect(() => {
    fetchCars();
  }, []);

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
    <div style={{ height: 500, width: "100%" }}>
      <AgGridReact
        rowData={cars}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
      />
    </div>
  );
}
