import { Routes, Route } from "react-router-dom";
import Main from "./Pages/Main";
import Admin from "./Pages/Admin";
import Register from "./Pages/Register";

function App() {
  return (
    <Routes>
      <Route path='main' element={<Main />} />
      <Route path='admin' element={<Admin />} />
      <Route path='/' element={<Register />} />
    </Routes>
  );
}

export default App;
