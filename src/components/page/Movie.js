import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import { loadMoviesData } from "../../redux/actions/moviesActions";
import Spinner from "../common/Spinner";
import Footer from "../common/Footer";
import '../../styles/Movie.scss';
import { MenuComponent, MoreVideos, PosterAndVideo, RecommendedComponent, TitleComponent } from "../common/CommonMovieSerieComponents";

const Movie = ({movies, loadMoviesData}) => {
    const {movie, movieVideos, recommended} = movies
    let {id} = useParams();
    const [stopLoading, setStopLoading] = useState(false);
    const [ isLoading, setIsLoading ] = useState(true);

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

            setTimeout(() => {
                setIsLoading(false);
            }, 500)

        }
    }, [stopLoading])

    return (
        <div className={'movie-page-container'}>
            {
                movie.length === 0 && movieVideos.length === 0 ? <Spinner /> :
                <div className={"container movie-container"}>
                    <TitleComponent data={movie} />
                    <MenuComponent data={movie} />
                    <PosterAndVideo data={movie} dataVideos={movieVideos} />
                    {movieVideos.length && <MoreVideos dataVideos={movieVideos} />}
                    {recommended.length && <RecommendedComponent dataRecommended={recommended} />}
                </div>
            }
            <Footer isLoading={isLoading} />
        </div>
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