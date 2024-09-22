import React, { useState } from 'react';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput);
      const response = await fetch('https://your-backend-url.herokuapp.com/bfhl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsedInput)
      });

      const result = await response.json();
      setResponse(result);
      setError('');
    } catch (err) {
      setError('Invalid JSON input');
    }
  };

  const handleSelect = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedOptions(value);
  };

  const renderResponse = () => {
    if (!response) return null;

    const dataToRender = selectedOptions.reduce((acc, option) => {
      if (response[option]) acc[option] = response[option];
      return acc;
    }, {});

    return (
      <div>
        {Object.entries(dataToRender).map(([key, value]) => (
          <div key={key}>
            <strong>{key}:</strong> {JSON.stringify(value)}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <h1>BFHL Frontend</h1>
      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder='Enter valid JSON'
        rows={6}
        cols={60}
      />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {response && (
        <>
          <label>Filter response: </label>
          <select multiple onChange={handleSelect}>
            <option value="numbers">Numbers</option>
            <option value="alphabets">Alphabets</option>
            <option value="highest_lowercase_alphabet">Highest lowercase alphabet</option>
          </select>
          {renderResponse()}
        </>
      )}
    </div>
  );
}

export default App;
