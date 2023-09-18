// src/components/StackList.js

import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [stacks, setStacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate fetching data (replace with your actual API call)
    setTimeout(() => {
      const data = [
        {
          id: '1',
          name: 'Stack 1',
          description: 'This is Stack 1',
          components: ['1', '2'],
        },
        {
          id: '2',
          name: 'Stack 2',
          description: 'This is Stack 2',
          components: ['3'],
        },
      ];
      setStacks(data);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  return (
    <div className="stack-list">
      <h1>List of Stacks</h1>
      {stacks.map((stack) => (
        <div key={stack.id} className="stack-card">
          <h2>{stack.name}</h2>
          <p>{stack.description}</p>
          <h3>Stack Components:</h3>
          <ul>
            {stack.components.map((componentId) => (
              <li key={componentId} className="stack-component">
                {/* Display stack component details here */}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default App;
