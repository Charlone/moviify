import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import { loadMoviesData } from "../../redux/actions/moviesActions";
import Spinner from "../common/Spinner";
import YoutubeEmbed from "../common/YoutubeEmbed";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '../../styles/Movie.scss';
import CategorySection from "../common/CategorySection";

const Movie = ({movies, loadMoviesData}) => {
    const {movie, movieVideos, recommended} = movies
    let {id} = useParams();
    const [stopLoading, setStopLoading] = useState(false);
    const sliderOptions = {
        rewind: true,
        gap: "1rem",
        type: 'slider',
        arrows: 'slider',
        autoplay: false,
        start: 0,
        drag: true,
        pagination: false,
        perPage: 3,
        perMove: 1,
        updateOnMove: true,
        fixedWidth: "33.33%",
        height: "auto"
    }

    useEffect(() => {
        return () => {
            if (movie.length === 0) {
                loadMoviesData('movie', id);
            }

            if (movieVideos.length === 0) {
                loadMoviesData('movieVideos', id);
            }

            if (stopLoading) {
                return;
            } else if (recommended.length === 0) {
                loadMoviesData('recommended', id);
                setStopLoading(true);
            }
        }
    }, [stopLoading])

    const Genres = ({genres}) => {
        let genresToDisplay = [];

        if (genres.length > 0) {
            genres.forEach(genre => {
                genresToDisplay.push(
                    <div key={genre.id} className={"genre"}>{genre.name}</div>
                );
            });
        }

        return genresToDisplay;
    }

    const getDuration = (int) => {
        let digit = Number(int);

        const hour = Math.floor(digit / 60),
            min = Math.floor((int - (hour * 60)));

        const hourDisplay = hour > 0 ? `${hour}h ` : '',
            minDisplay = min > 0 ? `${min}m` : '';

        return (hourDisplay + minDisplay) === '' ? 'TBA' : hourDisplay + minDisplay;
    }

    const dateFormatter = (date) => {
        const dateToFormat = new Date(date),
            options = { year: 'numeric', month: 'short', day: 'numeric' };

        return dateToFormat.toLocaleDateString("en-US", options) === 'Invalid Date' ? 'TBA' : dateToFormat.toLocaleDateString("en-US", options);
    }

    const MoreVideosSlider = ({movieVideos}) => {
        let videosArray = [];

        movieVideos.forEach(video => {
           videosArray.push(
               <SplideSlide key={video.key}>
                   <div className={"more-videos-vid"}>
                       <YoutubeEmbed embedId={video.key} />
                   </div>
               </SplideSlide>
           )
        });

        if (videosArray.length > 5) {
            return videosArray.slice(1, 6);
        }

        return videosArray;
    }

    return (
        <>
            {
                movie.length === 0 && movieVideos.length === 0 ? <Spinner /> :
                <div className={"container movie-container"}>
                    <div className={"movie-title"}>
                        <h3 className={"movie-title-header"}>
                            <strong>
                                {movie.title}
                            </strong>
                        </h3>
                        {movie.tagline ? (<span>{movie.tagline}</span>) : null}
                        {movie.tagline && movie.homepage ? (<span> - </span>) : null}
                        {movie.homepage ? (<span><a className={"text-white text-decoration-none"} href={movie.homepage} target={"_blank"}>{movie.homepage}</a></span>) : null}
                    </div>
                    <div className={"movie-menu-bar"}>
                        <div className={"genre-container"}>
                            <Genres genres={movie.genres} />
                        </div>
                        <div className={'release'}>
                            <h6 className={"heading"}>
                                <strong>
                                    {movie.status}
                                </strong>
                            </h6>
                            <span>{dateFormatter(movie.release_date)}</span>
                        </div>
                        <div className={'duration'}>
                            <h6 className={"heading"}>
                                <strong>
                                    Duration
                                </strong>
                            </h6>
                            <span>{getDuration(movie.runtime)}</span>
                        </div>
                        <div className={"rating"}>
                            <h6 className={"heading"}>
                                <strong>
                                    Rating
                                </strong>
                            </h6>
                            <svg className={"mb-1"} width={"13px"} id="Capa_1" x="0px" y="0px" viewBox="0 0 47.94 47.94" style={{ enableBackground:"new 0 0 47.94 47.94", marginRight: '.2rem' }}><path style={{ fill: "#E71"}} d="M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757  c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042  c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685  c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528  c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956  C22.602,0.567,25.338,0.567,26.285,2.486z"/><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
                            <span>{parseFloat(movie.vote_average).toFixed(1)}</span>
                        </div>
                        <div className={"languages"}>
                            <h6 className={"heading"}>
                                <strong>
                                    Languages
                                </strong>
                            </h6>
                            <span>{movie.spoken_languages.map(language => `${language.name} `) ?? "TBA"}</span>
                        </div>
                    </div>
                    <div className={"movie-body mt-3"}>
                        <div className={"movie-info"}>
                            <div className={"poster"}>
                                <img src={"https://image.tmdb.org/t/p/w300/" + movie.poster_path} alt={movie.title}/>
                            </div>
                            <div className={"overview"}>
                                {
                                    movieVideos.length > 0
                                        ? <YoutubeEmbed embedId={movieVideos[0].key} width={"100%"} height={"450px"} />
                                        : <div><h6 className={"no-movies"}>No video currently available.</h6></div>
                                }
                            </div>
                        </div>
                        <div className={'overview-text'}>
                            <p>{movie.overview}</p>
                        </div>
                    </div>
                    {
                        movieVideos.length > 0
                            ? (<div className={"more-videos"}>
                                <Splide options={sliderOptions}>
                                    <MoreVideosSlider movieVideos={movieVideos} width={"33.33%"} height={"400px"} />
                                </Splide>
                            </div>)
                            : null
                    }
                    {
                        recommended.length > 0 &&
                        <div className={"recommendations"}>
                            <h4 className={'recommendations-header'}>Other titles you may like</h4>
                            <CategorySection cards={recommended} />
                        </div>
                    }
                </div>
            }
        </>
    );
}

Movie.propTypes = {
    movies: PropTypes.object.isRequired,
    loadMoviesData: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
    return {
        movies: state.movies,
        activeSlug: state.activeSlug,
        viewRequested: state.viewRequested,
    }
}

const mapDispatchToProps = {
    loadMoviesData,
}

export default connect(mapStateToProps, mapDispatchToProps)(Movie);