import '../styles/App.scss';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./common/Nav";
import Home from "./page/Home";

function App() {
  return (
  <BrowserRouter>
    <Nav />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/movies" />
        <Route path="/movie/:id" />
        <Route path="/series" />
        <Route path="/serie/:id" />
        <Route path="/actors" />
        <Route path="/actor/:id" />
      </Routes>
  </BrowserRouter>
  );
}

export default App;
