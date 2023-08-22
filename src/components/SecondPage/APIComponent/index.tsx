import { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const columns: GridColDef[] = [
  { field: "userId", headerName: "User ID", width: 100 },
  { field: "id", headerName: "ID", width: 100 },
  { field: "title", headerName: "Title", width: 300 },
  { field: "body", headerName: "Body", width: 500 },
];

export default function APIComponent() {
  const [data, setData] = useState<Post[]>([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  return (
    <div>
      <h2>Component 1</h2>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5, page: 0 },
          },
        }}
      />
    </div>
  );
}
