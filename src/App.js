import React, { useState } from 'react';
import './App.css';
import TableList from './components/TableList';
import TableData from './components/TableData';

function App() {
  const [selectedTable, setSelectedTable] = useState(null);

  const handleTableSelect = (tableName) => {
    setSelectedTable(tableName);
  };

  return (
    <div className="App">
      <header>
        <h1></h1>
      </header>
      <main>
        <TableList onTableSelect={handleTableSelect} />
        {selectedTable ? (
          <TableData tableName={selectedTable} />
        ) : (
          <div className="placeholder">
            <p>Select a table to view its data.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
