import PropTypes from "prop-types";
import {loadMoviesData} from "../../redux/actions/moviesActions";
import {loadSeriesData} from "../../redux/actions/seriesActions";
import {connect} from "react-redux";
import {useEffect, useState} from "react";
import {FetchAll} from "../common/DataHandle";
import Spinner from "../common/Spinner";
import Footer from "../common/Footer";
import Card from "../common/Card";
import {useLocation} from "react-router-dom";
import {loadActiveSlug} from "../../redux/actions/activeSlugActions";
import initialState from "../../redux/reducers/initialState";
import 'animate.css';
import '../../styles/ShowMore.scss';

const ShowMore = ({ activeSlug, movies, series, loadMoviesData, loadSeriesData, loadActiveSlug }) => {
    const [page, setPage] = useState(1);
    const [prevPage, setPrevPage] = useState(0);
    const [ isLoading, setIsLoading ] = useState(true);
    const location = useLocation();

    useEffect(() => {
        loadActiveSlug(location.pathname.replace('/', ''));

        if (prevPage !== page) {
            if (Object.keys(movies).includes(activeSlug)) {
                setTimeout(() => FetchAll(loadMoviesData, movies, activeSlug, page), 500);
                setPrevPage(page);
            } else {
                setTimeout(() => FetchAll(loadSeriesData, series, activeSlug, page), 500);
                setPrevPage(page);
            }
        }

        setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => {
            if (Object.keys(movies).includes(activeSlug)) {
                FetchAll(loadMoviesData, movies, initialState);
            } else {
                FetchAll(loadSeriesData, series, initialState);
            }
        }
    }, [activeSlug, movies, series, page]);

    const ShowCards = () => {
        let cardsToShow = [],
            categoryToShow = [];

        if (Object.keys(movies).includes(activeSlug)) {
            if (movies[`${activeSlug}`].length > 0) {
                categoryToShow = movies[`${activeSlug}`];
            }
        } else {
            if (series[`${activeSlug}`].length > 0) {
                categoryToShow = series[`${activeSlug}`];
            }
        }

        categoryToShow.forEach(card => {
            cardsToShow.push(
                <Card
                    key={card.id}
                    originalTitle={card.title ? card.title : card.name}
                    posterPath={card.poster_path !== null ? process.env.REACT_APP_API_POSTER_PATH + card.poster_path : "/no_image.png"}
                    voteAverage={parseFloat(card.vote_average).toFixed(1)}
                    overview={card.overview !== ' ' ? card.overview : "No information currently available"}
                    href={card.title ? `/movie/${card.id}` : `/serie/${card.id}`}
                />
            )
        });

        return cardsToShow;
    }

    const Pagination = () => {
        const previousPages = [],
            nextPages = [];

        for (let i = (page - 1); i > (page - 9); i--) {
            if (i > 0) {
                previousPages.push(i);
            }
        }

        previousPages.sort(function(a, b){return a - b});

        for (let i = page; i < (page + 9); i++) {
            let totPages = Object.keys(movies).includes(activeSlug) ? movies.totalPages : series.totalPages;

            if (i < totPages) {
                nextPages.push(i);
            }
        }

        return (
            <div className={"pages-container"}>
                <button disabled={page === 1} onClick={() => setPage((page - 1))}>Previous</button>
                {previousPages.map(number => <button key={number} onClick={() => setPage(number)}>{number}</button>)}
                {nextPages.map(number => <button className={page === number ? 'active-page' : ''} key={number} onClick={() => setPage(number)}>{number}</button>)}
                <button disabled={Object.keys(movies).includes(activeSlug) ? page === movies.totalPages : page === series.totalPages} onClick={() => setPage((page + 1))}>Next</button>
                <p>Total pages {Object.keys(movies).includes(activeSlug) ? movies.totalPages : series.totalPages}</p>
            </div>
        );
    }

    return (
        <main className={"show-more"}>
            <div className={"container mt-1 show-more-container"}>
                <section className={"section text-white m-0 p-0"}>
                    {Object.keys(movies).includes(activeSlug) && movies[`${activeSlug}`] ? movies[`${activeSlug}`].length === 0 ? <Spinner /> : <div className={"categories-section-container animate__animated animate__backInUp"}><ShowCards /></div> : null}
                    {Object.keys(series).includes(activeSlug) && series[`${activeSlug}`] ? series[`${activeSlug}`].length === 0 ? <Spinner /> : <div className={"categories-section-container animate__animated animate__backInUp"}><ShowCards /></div> : null}
                </section>
                <section className={"pages-section"}>
                    <Pagination />
                </section>
            </div>
            <Footer isLoading={isLoading}/>
        </main>
    );
}

ShowMore.propTypes = {
    movies: PropTypes.object.isRequired,
    series: PropTypes.object.isRequired,
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
    loadActiveSlug,
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowMore);