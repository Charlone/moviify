import { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Switch from "../common/Switch";
import Spinner from "../common/Spinner";
import CategorySection from "../common/CategorySection";
import Preloader from "../common/Preloader";
import Footer from "../common/Footer";
import { loadMoviesData } from "../../redux/actions/moviesActions";
import { loadSeriesData } from "../../redux/actions/seriesActions";
import { loadActorsData } from "../../redux/actions/actorsActions"
import { FetchAll } from "../common/DataHandle";
import 'animate.css';
import "../../styles/Home.scss";

const Home = ({activeSlug, movies, series, loadMoviesData, loadSeriesData, loadActorsData }) => {
    const { nowPlaying, popularMovies, topMovies, upcoming } = movies;
    const { popularSeries, topSeries, onTheAir, airingToday } = series;
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        return () => {
            FetchAll(loadMoviesData, loadSeriesData, loadActorsData);

            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        }
    }, [loadMoviesData, loadSeriesData, loadActorsData]);

    return (
        <div className={"home"}>
            {isLoading && <Preloader />}
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
            <Footer isLoading={isLoading}/>
        </div>
    );
}

Home.propTypes = {
    activeSlug: PropTypes.string.isRequired,
    viewRequested: PropTypes.string.isRequired,
    movies: PropTypes.object.isRequired,
    loadMoviesData: PropTypes.func.isRequired,
    loadSeriesData: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
    return {
        activeSlug: state.activeSlug,
        viewRequested: state.viewRequested,
        actors: state.actors,
        movies: state.movies,
        series: state.series,
    }
}

const mapDispatchToProps = {
    loadMoviesData,
    loadSeriesData,
    loadActorsData
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);