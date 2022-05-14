import '../styles/App.scss';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./common/Nav";
import Home from "./page/Home";

function App() {
  return (
  <BrowserRouter>
    <Nav />
      <Routes>
        <Route exact path="/" element={<Home  />} />
      </Routes>
  </BrowserRouter>
  );
}

export default App;
