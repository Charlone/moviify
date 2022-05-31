import { connect } from "react-redux";
import PropTypes from "prop-types";
import Switch from "../common/Switch";
import Spinner from "../common/Spinner";
import CategorySection from "../common/CategorySection";
import 'animate.css';
import "../../styles/Home.scss";

const Home = ({activeSlug, movies, series}) => {
    const { nowPlaying, popularMovies, topMovies, upcoming } = movies;
    const { popularSeries, topSeries, onTheAir, airingToday } = series;

    return (
        <div className={"container mt-1 home-container"}>
            <section className={"section text-white  m-0 p-0"}>
                <div className={"main-container mt-2 mb-2"}>
                    <div className={"category-header-container"}>
                        <Switch />
                    </div>
                    {activeSlug === 'popularMovies' && popularMovies.length === 0 ? <Spinner /> : (activeSlug === 'popularMovies' && <div className={"animate__animated animate__backInUp"}><CategorySection cards={popularMovies} /></div>)}
                    {activeSlug === 'nowPlaying' && nowPlaying.length === 0 ? <Spinner /> : (activeSlug === 'nowPlaying' && <div className={"animate__animated animate__backInUp"}><CategorySection cards={nowPlaying} /></div>)}
                    {activeSlug === 'topMovies' && topMovies.length === 0 ? <Spinner /> : (activeSlug === 'topMovies' && <div className={"animate__animated animate__backInUp"}><CategorySection cards={topMovies} /></div>)}
                    {activeSlug === 'upcoming' && upcoming.length === 0 ? <Spinner /> : (activeSlug === 'upcoming' && <div className={"animate__animated animate__backInUp"}><CategorySection cards={upcoming} /></div>)}
                    {activeSlug === 'popularSeries' && popularSeries.length === 0 ? <Spinner /> : (activeSlug === 'popularSeries' && <div className={"animate__animated animate__backInUp"}><CategorySection cards={popularSeries} /></div>)}
                    {activeSlug === 'topSeries' && topSeries.length === 0 ? <Spinner /> : (activeSlug === 'topSeries' && <div className={"animate__animated animate__backInUp"}><CategorySection cards={topSeries} /></div>)}
                    {activeSlug === 'onTheAir' && onTheAir.length === 0 ? <Spinner /> : (activeSlug === 'onTheAir' && <div className={"animate__animated animate__backInUp"}><CategorySection cards={onTheAir} /></div>)}
                    {activeSlug === 'airingToday' && airingToday.length === 0 ? <Spinner /> : (activeSlug === 'airingToday' && <div className={"animate__animated animate__backInUp"}><CategorySection cards={airingToday} /></div>)}
                </div>
            </section>
        </div>
    );
}

Home.propTypes = {
    activeSlug: PropTypes.string.isRequired,
    viewRequested: PropTypes.string.isRequired,
    movies: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
    return {
        activeSlug: state.activeSlug,
        movies: state.movies,
        series: state.series,
        viewRequested: state.viewRequested,
    }
}

export default connect(mapStateToProps)(Home);