import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { loadMoviesData } from "../../redux/actions/moviesActions";
import { loadViewRequested } from "../../redux/actions/viewRequestedActions";
import PropTypes from "prop-types";
import { toast } from 'react-toastify';
import Switch from "../common/Switch";
import Card from "../common/Card";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import "../../styles/Home.scss";
import initialState from "../../redux/reducers/initialState";
import Spinner from "../common/Spinner";

const CategoryComponent = ({cards}) => {
    const sliderOptions = {
        rewind: true,
        gap: "1rem",
        type: 'slider',
        arrows: 'slider',
        autoplay: false,
        start: 0,
        drag: true,
        pagination: true,
        perPage: 6,
        perMove: 1,
        updateOnMove: true,
        width: "100%",
        height: "auto"
    }

    let cardData = [];

    cards.forEach(card => {
        cardData.push(
            <SplideSlide key={card.id}>
                <Card
                    originalTitle={card.original_title}
                    posterPath={"https://image.tmdb.org/t/p/w300/" + card.poster_path}
                    voteAverage={card.vote_average}
                    overview={card.overview}
                />
            </SplideSlide>
        );
    })

    return (
        <>
            <Splide options={sliderOptions}>
                {cardData}
            </Splide>
        </>
    );
}

const Home = ({viewRequested, movies, loadMoviesData, loadViewRequested}) => {
    const { nowPlaying, popular, top, upcoming, movie, images } = movies;
    const [activeSlug, setActiveSlug] = useState('popular');
    const [isLoading, setIsLoading] = useState();

    useEffect(() => {
        if (popular.length === 0) {
            setIsLoading(true);
            loadMoviesData("popular")
                .catch(error => toast.error("Could not load movies: " + error, {
                        position: "top-right",
                        autoClose: 10000,
                        hideProgressBar: false,
                        closeOnClick: true,
                    })
                );
            setIsLoading(false);
        }

        if (nowPlaying.length === 0) {
            setIsLoading(true);
            loadMoviesData("nowPlaying")
                .catch(error => toast.error("Could not load movies: " + error, {
                        position: "top-right",
                        autoClose: 10000,
                        hideProgressBar: false,
                        closeOnClick: true,
                    })
                );
            setIsLoading(false);
        }

        if (top.length === 0) {
            setIsLoading(true);
            loadMoviesData("top")
                .catch(error => toast.error("Could not load movies: " + error, {
                        position: "top-right",
                        autoClose: 10000,
                        hideProgressBar: false,
                        closeOnClick: true,
                    })
                );
            setIsLoading(false);
        }

        if (upcoming.length === 0) {
            setIsLoading(true);
            loadMoviesData("upcoming")
                .catch(error => toast.error("Could not load movies: " + error, {
                        position: "top-right",
                        autoClose: 10000,
                        hideProgressBar: false,
                        closeOnClick: true,
                    })
                );
            setIsLoading(false);
        }
    }, [nowPlaying, popular, top, upcoming])

    const handleClick = (e) => {
        setActiveSlug(e.target.dataset.slug);
        let categoryToCheck;

        switch (activeSlug) {
            case "popular": categoryToCheck = popular; break;
            case "top": categoryToCheck = top; break;
            case "upcoming": categoryToCheck = upcoming; break;
            case "movie": categoryToCheck = movie; break;
            case "images": categoryToCheck = images; break;
            case "nowPlaying": categoryToCheck = nowPlaying; break;
        }

        if (categoryToCheck.length === 0) {
            setIsLoading(true)
            loadMoviesData(activeSlug)
                .then(() => {
                    setIsLoading(false);
                })
                .catch(error => toast.error("Could not load movies: " + error, {
                        position: "top-right",
                        autoClose: 10000,
                        hideProgressBar: false,
                        closeOnClick: true,
                    })
                );
        }
    }

    const Headers = () => {
        const categoryArray = initialState.headers;
        let headers = [];

        categoryArray.forEach(categoryTitle => {
            headers.push(
                <h4 key={categoryTitle.slug} className={"category-header"} onClick={handleClick}>
                    <strong data-slug={categoryTitle.slug}>
                        {categoryTitle.label}
                    </strong>
                </h4>
            );
        });

        return headers;
    }

    return (
        <div className={"container mt-1 home-container"}>
            <section className={"section text-white  m-0 p-0"}>
                <div className={"main-container mt-2 mb-2"}>
                    <div className={"category-header-container"}>
                        <div className={"category-header-nav"}>
                            <Headers />
                        </div>
                        <Switch />
                    </div>
                    {activeSlug === 'popular' && popular.length === 0 ? <Spinner /> : (activeSlug === 'popular' && <CategoryComponent cards={popular} />)}
                    {activeSlug === 'nowPlaying' && nowPlaying.length === 0 ? <Spinner /> : (activeSlug === 'nowPlaying' && <CategoryComponent cards={nowPlaying} />)}
                    {activeSlug === 'top' && top.length === 0 ? <Spinner /> : (activeSlug === 'top' && <CategoryComponent cards={top} />)}
                    {activeSlug === 'upcoming' && upcoming.length === 0 ? <Spinner /> : (activeSlug === 'upcoming' && <CategoryComponent cards={upcoming} />)}
                </div>
            </section>
        </div>
    );
}

Home.propTypes = {
    viewRequested: PropTypes.string.isRequired,
    movies: PropTypes.object.isRequired,
    loadMoviesData: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        movies: state.movies,
        viewRequested: state.viewRequested,
    }
}

const mapDispatchToProps = {
    loadMoviesData,
    loadViewRequested,
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);