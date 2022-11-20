import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./common/Nav";
import Home from "./page/Home";
import Actors from "./page/Actors";
import Movie from "./page/Movie";
import Serie from "./page/Serie";
import Actor from "./page/Actor";
import ShowMore from "./page/ShowMore";
import '../styles/App.scss';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/movie/:id" element={<Movie />} />
        <Route path="/serie/:id" element={<Serie />} />
        <Route path="/actors" element={<Actors />} />
        <Route path="/actor/:id" element={<Actor />} />
        <Route path="/popularMovies" element={<ShowMore />} />
        <Route path="/topMovies" element={<ShowMore />} />
        <Route path="/upcoming" element={<ShowMore />} />
        <Route path="/nowPlaying" element={<ShowMore />} />
        <Route path="/popularSeries" element={<ShowMore />} />
        <Route path="/topSeries" element={<ShowMore />} />
        <Route path="/onTheAir" element={<ShowMore />} />
        <Route path="/airingToday" element={<ShowMore />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
