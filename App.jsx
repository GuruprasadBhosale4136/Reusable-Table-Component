// import React, { useState } from 'react';
// import DataTable from 'react-data-table-component';
// import { data } from './components/data';
// import './App.css';

// const columns = [
//   {
//     name: "Sale_ID",
//     selector: row => row.Sale_ID,
//   },
//   {
//     name: "Product_Name",
//     selector: row => row.Product_Name,

//   },
//   {
//     name: "Quantity_Sold",
//     selector: row => row.Quantity_Sold,
//   },
//   {
//     name: "Sale_Date",
//     selector: row => row.Sale_Date,
//     sortable:true
//   },
//   {
//     name: "Total_Amount",
//     selector: row => row.Total_Amount,
//     sortable:true
//   },
//   {
//     name:"action",
//     selector:row=>row.action,
//   }
// ];


// const customStyles = {

// headCells:{
//   style:{

//     backgroundColor:"Black",
//     color:"white",
//     fontSize:"17px",
//     fontWeight:"bolder"

//   }
// }


// }

// const App = () => {

  
//   const [records, setRecords] = useState(data);

//   const handleChange = (e) => {
//     let query = e.target.value;
//     const newRecords = data.filter((item) =>
//       item.Product_Name.toLowerCase().includes(query.toLowerCase())
//     );
//     setRecords(newRecords);
//   };

//   return (

//     <>
    
      



//     <div className="homeDiv">
//       <div className="search">
//         <h2>Product List</h2>
//         <input type="text" placeholder="Search By Product" onChange={handleChange} />
//       </div>
//       <DataTable
//         columns={columns}
//         data={records}  
//         customStyles={customStyles}
//         pagination
//       />
//     </div>

//     </>
//   );
// };

// export default App;






import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { data } from "./components/data";
import "./App.css";

const App = () => {
  const [records, setRecords] = useState(data);
  const [editingId, setEditingId] = useState(null);
  const [editedProductName, setEditedProductName] = useState("");

  // Handle search
  const handleChange = (e) => {
    let query = e.target.value;
    const newRecords = data.filter((item) =>
      item.Product_Name.toLowerCase().includes(query.toLowerCase())
    );
    setRecords(newRecords);
  };

  // Handle edit click
  const handleEditClick = (row) => {
    setEditingId(row.Sale_ID);
    setEditedProductName(row.Product_Name);
  };

  // Save edited product name
  const handleSaveClick = () => {
    setRecords((prevRecords) =>
      prevRecords.map((item) =>
        item.Sale_ID === editingId
          ? { ...item, Product_Name: editedProductName }
          : item
      )
    );
    setEditingId(null);
  };

  // Handle delete row
  const handleDelete = (saleId) => {
    setRecords((prevRecords) =>
      prevRecords.filter((item) => item.Sale_ID !== saleId)
    );
  };

  // Handle refund
  const handleRefund = (saleId) => {
    const confirmRefund = window.confirm(
      "Are you sure you want to refund?"
    );
    if (confirmRefund) {
      setRecords((prevRecords) =>
        prevRecords.map((item) =>
          item.Sale_ID === saleId ? { ...item, Total_Amount: 0 } : item
        )
      );
    }
  };

  // Table Columns
  const columns = [
    {
      name: "Sale_ID",
      selector: (row) => row.Sale_ID,
    },
    {
      name: "Product_Name",
      selector: (row) =>
        editingId === row.Sale_ID ? (
          <input
            type="text"
            value={editedProductName}
            onChange={(e) => setEditedProductName(e.target.value)}
            className="px-2 py-1 border rounded"
          />
        ) : (
          row.Product_Name
        ),
    },
    {
      name: "Quantity_Sold",
      selector: (row) => row.Quantity_Sold,
      sortable:true
    },
    {
      name: "Sale_Date",
      selector: (row) => row.Sale_Date,
      sortable: true,
    },
    {
      name: "Total_Amount",
      selector: (row) => row.Total_Amount,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div style={{ display: "flex", gap: "5px" }}>
          {editingId === row.Sale_ID ? (
            <button
              className="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={handleSaveClick}
            >
              Save
            </button>
          ) : (
            <button
              className="px-2 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
              onClick={() => handleEditClick(row)}
            >
              Edit
            </button>
          )}
          <button
            className="px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
            onClick={() => handleDelete(row.Sale_ID)}
          >
            Delete
          </button>
          <button
            className="px-2 py-1 text-sm bg-orange-500 text-white rounded hover:bg-orange-600"
            onClick={() => handleRefund(row.Sale_ID)}
          >
            Refund
          </button>
        </div>
      ),
    },
  ];

  const customStyles = {
    headCells: {
      style: {
        backgroundColor: "Black",
        color: "white",
        fontSize: "17px",
        fontWeight: "bolder",
      },
    },
  };

  return (
    <>
      <div className="homeDiv">
      <div className="text-center font-bold text-xl">Sales Data Table Component</div>
        <div className="search">
          <h2>Product List</h2>
          <input
            type="text"
            placeholder="Search By Product"
            onChange={handleChange}
          />
        </div>
        <DataTable
          columns={columns}
          data={records}
          customStyles={customStyles}
          pagination
        />
      </div>
    </>
  );
};

export default App;
