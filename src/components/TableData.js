import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TableData.css';

const TableData = ({ tableName }) => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetching the data from the server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/table/${tableName}`);
        if (response.data.length > 0) {
          setColumns(Object.keys(response.data[0])); // Get column names
        }
        setData(response.data); // Set the table data
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch table data.');
        setLoading(false);
      }
    };
    fetchData();
  }, [tableName]);

  //handling the boolean checkboxes
  const handleCheckboxChange = async (id, column, value) => {
    console.log(`Updating boolean value for table: ${tableName}, id: ${id}, column: ${column}, new value: ${!value}`);
    
    try {
      //sending a patch request to update the boolean value
      await axios.patch(`/api/table/${tableName}/${id}/${column}`, { value: !value });

      //mapping the data the boolean data 
      setData((prevData) =>
        prevData.map((row) =>
          row.id === id ? { ...row, [column]: !value } : row
        )
      );
    } catch (err) {
      console.error('Failed to update boolean value:', err);
      setError('Failed to update boolean value.');
    }
  };

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="table-data">
      <h3>Data for "{tableName}"</h3>
      {data.length === 0 ? (
        <p>No data available.</p>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.id}>
                  {columns.map((col) => (
                    <td key={col}>
                      {typeof row[col] === 'boolean' ? (
                        <input
                          type="checkbox"
                          checked={row[col]}
                          onChange={() => handleCheckboxChange(row.id, col, row[col])}
                        />
                      ) : (
                        row[col]
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TableData;


