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

const Home = ({activeSlug, movies, series, loadMoviesData, loadSeriesData }) => {
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        if (Object.keys(movies).includes(activeSlug)) {
            setTimeout(() => FetchAll(loadMoviesData, movies, activeSlug), 500);
        } else {
            setTimeout(() => FetchAll(loadSeriesData, series, activeSlug), 500);
        }

        setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => {}
    }, [activeSlug, movies, series]);

    return (
        <main className={"home"}>
            {isLoading && <Preloader />}
            <div className={"container mt-1 home-container"}>
                <section className={"section text-white  m-0 p-0"}>
                    <div className={"main-container mt-2 mb-2"}>
                        <div className={"category-header-container"}>
                            <Switch />
                        </div>
                        {Object.keys(movies).includes(activeSlug) && movies[`${activeSlug}`] ? movies[`${activeSlug}`].length === 0 ? <Spinner /> : <div className={"categories-section-container animate__animated animate__backInUp"}><CategorySection cards={movies[`${activeSlug}`]} activeSlug={activeSlug} /></div> : null}
                        {Object.keys(series).includes(activeSlug) && series[`${activeSlug}`] ? series[`${activeSlug}`].length === 0 ? <Spinner /> : <div className={"categories-section-container animate__animated animate__backInUp"}><CategorySection cards={series[`${activeSlug}`]} activeSlug={activeSlug} /></div> : null}
                    </div>
                </section>
            </div>
            <Footer isLoading={isLoading}/>
        </main>
    );
}

Home.propTypes = {
    activeSlug: PropTypes.string.isRequired,
    viewRequested: PropTypes.string.isRequired,
    movies: PropTypes.object.isRequired,
    series: PropTypes.object.isRequired,
    actors: PropTypes.object.isRequired,
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