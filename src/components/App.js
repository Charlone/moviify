import '../styles/App.scss';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./common/Nav";

function App() {
  return (
  <BrowserRouter>
    <Nav />
      <Routes>
        <Route exact path="/" />
      </Routes>
  </BrowserRouter>
  );
}

export default App;
