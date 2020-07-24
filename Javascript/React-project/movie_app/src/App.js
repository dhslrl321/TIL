import React from 'react';


const foodILike = [
  { id: 1, name: "kimchi" },
  { id: 2, name: "bibimbap" },
  { id: 3, name: "kimbob" }
]

function Food({ name }) {
  return (
    <div>
      I Like {name}
    </div>
  );
}

function foodRendering(dish) {
  return <Food key={dish.id} name={dish.name} />

}

function App() {
  return (
    <div>
      <h2>Hello</h2>
      {foodILike.map(foodRendering)}
    </div>
  );
}

export default App;
