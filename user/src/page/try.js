import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Try() {
  const [listOfUsers, setlistOfUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/register").then((response) => {
      setlistOfUsers(response.data);
    });
  }, []);

  return (
    <div className="App">
      {listOfUsers.map((value, key) => {
        return (
          <div className="Box">

            <h1 className="Title"> EMAIL</h1>
            <p>{value.email}</p>


            <h1 className="Title"> PASSWORD</h1>
            <p>{value.password}</p>

          </div>
        )
      })}
    </div>
  )
}

export default Try