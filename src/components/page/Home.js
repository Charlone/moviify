import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { loadActiveSlug } from "../../redux/actions/activeSlugActions";
import { loadMoviesData } from "../../redux/actions/moviesActions";
import { loadViewRequested } from "../../redux/actions/viewRequestedActions";
import PropTypes from "prop-types";
import { toast } from 'react-toastify';
import Switch from "../common/Switch";
import Spinner from "../common/Spinner";
import MovieCategorySection from "../common/MovieCategorySection";
import 'animate.css';
import "../../styles/Home.scss";

const Home = ({activeSlug, viewRequested, movies, loadMoviesData, loadViewRequested, loadActiveSlug}) => {
    const { nowPlaying, popular, top, upcoming, movie, images } = movies;

    return (
        <div className={"container mt-1 home-container"}>
            <section className={"section text-white  m-0 p-0"}>
                <div className={"main-container mt-2 mb-2"}>
                    <div className={"category-header-container"}>
                        <div className={"category-header-nav"}>
                            {/*<Headers />*/}
                        </div>
                        <Switch />
                    </div>
                    {activeSlug === 'popular' && popular.length === 0 ? <Spinner /> : (activeSlug === 'popular' && <div className={"animate__animated animate__backInUp"}><MovieCategorySection cards={popular} /></div>)}
                    {activeSlug === 'nowPlaying' && nowPlaying.length === 0 ? <Spinner /> : (activeSlug === 'nowPlaying' && <div className={"animate__animated animate__backInUp"}><MovieCategorySection cards={nowPlaying} /></div>)}
                    {activeSlug === 'top' && top.length === 0 ? <Spinner /> : (activeSlug === 'top' && <div className={"animate__animated animate__backInUp"}><MovieCategorySection cards={top} /></div>)}
                    {activeSlug === 'upcoming' && upcoming.length === 0 ? <Spinner /> : (activeSlug === 'upcoming' && <div className={"animate__animated animate__backInUp"}><MovieCategorySection cards={upcoming} /></div>)}
                </div>
            </section>
        </div>
    );
}

Home.propTypes = {
    activeSlug: PropTypes.string.isRequired,
    viewRequested: PropTypes.string.isRequired,
    movies: PropTypes.object.isRequired,
    loadMoviesData: PropTypes.func.isRequired,
    // popular: PropTypes.array.isRequired,
    // latest: PropTypes.array.isRequired,
    // nowPlaying: PropTypes.array.isRequired,
    // top: PropTypes.array.isRequired,
    // upcoming: PropTypes.array.isRequired,
}

function mapStateToProps(state) {
    return {
        activeSlug: state.activeSlug,
        movies: state.movies,
        viewRequested: state.viewRequested,
    }
}

const mapDispatchToProps = {
    loadMoviesData,
    loadViewRequested,
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);