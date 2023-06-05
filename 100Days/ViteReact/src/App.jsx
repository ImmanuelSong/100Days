import { useState } from "react";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="w-[350px] h-[150px] bg-white rounded-sm border-black flex flex-col justify-center items-center">
        <h2 className="text-yellow-600">The Count is : </h2>
        <span className="text-slate-500">{count}</span>
        <button
          className="rounded-full bg-slate-900 text-white w-1/2"
          onClick={() => {
            setCount(count + 1);
          }}
        >
          Click if you want
        </button>
      </div>
    </>
  );
}

export default App;
