import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Detail from "./routes/Detail";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="mx-auto bg-orange-50">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<Detail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
