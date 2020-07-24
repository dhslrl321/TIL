import React from 'react';


const names = [
  {id: 1, name: "jang", age: 24},
  {id: 2, name: "heo", age: 25}
]

function Food({fav}){
  return (
    <div>{fav}</div>
  )
}

function App() {
  return (
    <Food fav="kimchi"></Food>
  );
}

export default App;
