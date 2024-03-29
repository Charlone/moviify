import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { loadMoviesData } from "../../redux/actions/moviesActions";
import { MenuComponent, MoreVideos, PosterAndVideo, RecommendedComponent, TitleComponent } from "../common/CommonMovieSerieComponents";
import Spinner from "../common/Spinner";
import Footer from "../common/Footer";
import '../../styles/Movie.scss';

const Movie = ({movies, loadMoviesData}) => {
    const {movie, movieVideos, recommended} = movies;
    let {id} = useParams();
    const [stopLoading, setStopLoading] = useState(false);
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
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

        return () => {}
    }, [stopLoading])

    return (
        <main className={'movie-page-container'}>
            {
                movie.length === 0 && movieVideos.length === 0 ? <Spinner /> :
                <section className={"container movie-container"}>
                    <TitleComponent data={movie} />
                    <MenuComponent data={movie} />
                    <PosterAndVideo data={movie} dataVideos={movieVideos} />
                    {movieVideos.length > 0 && <MoreVideos dataVideos={movieVideos} />}
                    {recommended.length > 0 && <RecommendedComponent dataRecommended={recommended} />}
                </section>
            }
            <Footer isLoading={isLoading} />
        </main>
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