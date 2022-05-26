import '../styles/App.scss';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./common/Nav";
import Home from "./page/Home";
import Actors from "./page/Actors";

function App() {
  return (
  <BrowserRouter>
    <Nav />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/movie/:id" />
        <Route path="/serie/:id" />
        <Route path="/actors" element={<Actors />} />
        <Route path="/actor/:id" />
      </Routes>
  </BrowserRouter>
  );
}

export default App;
