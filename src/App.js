import React, { useState } from 'react';
import './App.css';
import TableList from './components/TableList';
import TableData from './components/TableData';

function App() {
  const [selectedTable, setSelectedTable] = useState(null);

  const handleTableSelect = (tableName) => {
    setSelectedTable(tableName);
  };

    //Super secure password!
    const masterPassword = 'operationmaserati';
  
    // Track if the user has entered the correct password
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passwordInput, setPasswordInput] = useState('');
    const [error, setError] = useState('');
  
    // Handle password form submission
    const handlePasswordSubmit = (e) => {
      e.preventDefault();
      if (passwordInput === masterPassword) {
        setIsAuthenticated(true);
        setError(''); // Clear any error
      } else {
        setError('Incorrect password, try again!');
      }
    };
  
    // If not authenticated, show the password form
    if (!isAuthenticated) {
      return (
        <div className="password-form">
          <h3>Please enter the password:</h3>
          <form onSubmit={handlePasswordSubmit}>
            <input
              type="password"
              placeholder="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      );
    }

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
