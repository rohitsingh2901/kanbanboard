import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div id="app">
      <Router>
        <Navbar />
        <Routes>
          <Route   path="/kanbanboard" element={<Home/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
