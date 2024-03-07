import React, { useState, useEffect } from 'react';

function HelloMessage() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Function to fetch message from the backend
    const fetchMessage = async () => {
      try {
        const response = await fetch('https://bc3rpp-ip-84-209-2-193.tunnelmole.net/api/hello');
        const data = await response.json();
        setMessage(data.message);
      } catch (error) {
        console.error('Failed to fetch message:', error);
        setMessage('Error fetching message');
      }
    };

    fetchMessage();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div>
      {message ? <p>{message}</p> : <p>Loading message...</p>}
    </div>
  );
}

export default HelloMessage;