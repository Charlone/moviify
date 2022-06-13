import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loadActorsData } from "../../redux/actions/actorsActions";
import { dateFormatter } from "../common/DataHandle";
import Footer from "../common/Footer";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "../../styles/Actor.scss";

const Actor = ({actors, loadActorsData}) => {
    const {actor, actorImages, trending} = actors;
    let {id} = useParams();
    const sliderOptions = {
        rewind: true,
        type: 'slider',
        arrows: 'slider',
        autoplay: false,
        start: 0,
        drag: true,
        pagination: false,
        perPage: 4,
        perMove: 1,
        updateOnMove: true,
        height: "auto"
    }

    const trendingSliderOptions = {
        rewind: true,
        type: 'slider',
        arrows: 'slider',
        autoplay: false,
        start: 0,
        drag: true,
        pagination: false,
        perPage: 7,
        perMove: 1,
        updateOnMove: true,
        height: "auto"
    }

    useEffect(() => {
        return () => {
            if (actor.length === 0) {
                loadActorsData('actor', id);
            }

            if (actorImages.length === 0) {
                loadActorsData('actorImages', id);
            }

            if (trending.length === 0) {
                loadActorsData('trending');
            }
        }
    }, [actor]);

    const MoreImages = ({actorImages}) => {
        let photos = [];

        if (typeof actorImages !== 'undefined') {
            actorImages.forEach(actorImage => {
                photos.push(
                    <SplideSlide key={actorImage.id}>
                        <div className={"actor-image"}>
                            <img src={process.env.REACT_APP_API_POSTER_PATH + actorImage.file_path} alt={actorImage.name}/>
                        </div>
                    </SplideSlide>
                );
            });
        }

        return photos.slice(1);
    }

    const TrendingActors = ({trending}) => {
        let trendingActorsToShow = [];

        if (typeof trending !== 'undefined') {
            trending.forEach(actor => {
                if (actor.profile_path !== null) {
                    trendingActorsToShow.push(
                        <SplideSlide key={actor.id}>
                            <div className={"actor-name-container"}>
                                <span className={"actor-name"}>{actor.name}</span>
                            </div>
                            <img src={process.env.REACT_APP_API_POSTER_PATH + actor.profile_path} alt={actor.name} />
                            <a href={`/actor/${actor.id}`} className={"btn profile-button"}>Profile</a>
                        </SplideSlide>
                    );
                }
            });
        }

        return trendingActorsToShow;
    }

    return (
        <>
            <div className={"actor-section-container"}>
                <div className={"actor-name-container"}>
                    <h3 className={"header"}>
                        <strong>
                            {actor.name}
                        </strong>
                    </h3>
                    <span className={'timeline'}>{dateFormatter(actor.birthday)} - {actor.deathday !== null ? dateFormatter(actor.deathday) : 'Present'}, {actor.place_of_birth} - <svg className={"mb-1"} width={"13px"} id="Capa_1" x="0px" y="0px" viewBox="0 0 47.94 47.94" style={{ enableBackground:"new 0 0 47.94 47.94", marginRight: '.2rem' }}><path style={{ fill: "#E71"}} d="M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757  c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042  c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685  c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528  c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956  C22.602,0.567,25.338,0.567,26.285,2.486z"/><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg> {typeof actor.popularity !== 'undefined' ? actor.popularity.toFixed(0) : null}</span>
                </div>
                <div className={"actor-section-body"}>
                    <div className={"bio"}>
                        <img src={process.env.REACT_APP_API_POSTER_PATH + actor.profile_path} alt={actor.name} />
                        <h6 className={"bio-header"}>
                            <strong>
                                Biography
                            </strong>
                        </h6>
                        <p className={"bio-text"}>{actor.biography}</p>
                    </div>
                    <div className={"more-photos"}>
                        <h5 className={"header"}>
                            <strong>
                                Gallery
                            </strong>
                        </h5>
                        <Splide options={sliderOptions}>
                            <MoreImages actorImages={actorImages} />
                        </Splide>
                    </div>
                </div>
            </div>
            <div className={"trending"}>
                <h5 className={"header"}>
                    <strong>
                        Trending right now
                    </strong>
                </h5>
                <Splide options={trendingSliderOptions}>
                    <TrendingActors trending={trending} />
                </Splide>
            </div>
            <Footer />
        </>
    );
}

Actor.propTypes = {
    actors: PropTypes.object.isRequired,
    loadActorsData: PropTypes.func.isRequired,
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
    loadActorsData,
}

export default connect(mapStateToProps, mapDispatchToProps)(Actor);