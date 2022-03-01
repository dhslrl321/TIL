import React, {useState, useEffect} from 'react';

import {club as c, leader as l} from "./data";

const App = () => {

  const [state, setState] = useState({
    club: {},
    leader: {}
  })

  useEffect(() => {
    setState(state => ({
      ...state,
      club: c,
      leader: l
    }));
  });

  const {
    club,
    leader
  } = state;

  return (
    <div>
      <table>
        <tbody>
          <th>클럽장</th>
          <td>{leader.name}</td>
        </tbody>
      </table>
    </div>
  );
}

export default App;
