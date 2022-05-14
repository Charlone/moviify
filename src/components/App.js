import '../styles/App.scss';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./common/Nav";
import Switch from "./common/Switch";

function App() {
  return (
  <BrowserRouter>
    <Nav />
      <Routes>
        <Route exact path="/" element={<Switch  />} />
      </Routes>
  </BrowserRouter>
  );
}

export default App;
