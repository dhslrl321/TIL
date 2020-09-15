import React, { useState, useEffect } from 'react';


const App = () => {
  const [count, setCount] = useState(0);

  const handleCounterClick = () => {
    setCount(count + 1)
  }
  useEffect(() => {
    console.log("컴포는트가 화면에 나타남")
    return () => {
      console.log("컴포넌트가 화면에서 사라짐");
    }
  })

  return (
    <div>
      <p>You Clicked {count} times</p>
      <button onClick={handleCounterClick}>
        Click me
      </button>
    </div>
  )
}

export default App;