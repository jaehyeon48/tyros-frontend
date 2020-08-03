import React from 'react';
import axios from 'axios';

export default function DatabaseTest() {
  async function handleTest() {
    const response = await axios.get('https://tyros.herokuapp.com/api/test');
    console.log(response);
  }

  return (
    <div>
      <button onClick={handleTest}>Test Query</button>
    </div>
  )
}