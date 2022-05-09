import '../styles/App.scss';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./common/Nav";

function App() {
  return (
    <div className={"container-fluid"}>
      <BrowserRouter>
        <Nav />
          <Routes>
            <Route exact path="/" />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
