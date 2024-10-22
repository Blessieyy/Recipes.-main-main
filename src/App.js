import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Recipes from "./Pages/Recipes";
import Settings from "./Pages/Settings";
import Addrecipes from "./Pages/Addrecipes";



function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="container main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/addrecipes" element={<Addrecipes />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
