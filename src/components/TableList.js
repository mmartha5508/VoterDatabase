import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TableList.css';

const TableList = ({ onTableSelect }) => {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //Sending GET request to fetch the tables
  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await axios.get('/api/tables');
        setTables(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch tables.');
        setLoading(false);
      }
    };
    fetchTables();
  }, []);

  if (loading) return <p>Loading tables...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="table-list">
      <h2>Available Tables</h2>
      <ul>
        {tables.map((table) => (
          <li key={table.table_name} onClick={() => onTableSelect(table.table_name)}>
            {table.table_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableList;
