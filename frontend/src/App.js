import React, { useEffect, useState } from 'react';
import './App.css';

const serverURL = 'https://cs348-database10.appspot.com';

function App() {
  // Testing connection with backend
  const [backendMessage, setBackendMessage] = useState('');
  
  useEffect(() => {
    fetch(`${serverURL}/courses`)
      .then(response => response.json())
      .then(data => {
        const { courses } = data;
        setBackendMessage(courses);
      })
      .catch(err => {
        setBackendMessage("Error getting info");
        console.error(err);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {/* TODO: Add stuff here */}
        {`Backend Message: ${backendMessage}`}
      </header>
    </div>
  );
}

export default App;
