import { Genres, MoreVideosSlider, sliderOptions } from "./DataHandle";
import { getDuration } from "./DataHandle";
import { dateFormatter } from "./DataHandle";
import YoutubeEmbed from "./YoutubeEmbed";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import CategorySection from "./CategorySection";
import Author from "./Author";
import Card from "./Card";

export const truncateText = (text, length) => {
    return text.length > length ? text.substring(0, length) + '...' : text;
}

export const TitleComponent = ({data}) => {
    return (
        <section className={"movie-title"}>
            <h3 className={"movie-title-header"}>
                <strong>
                    {data.title ? data.title : data.name}
                </strong>
            </h3>
            {data.tagline ? (<span>{data.tagline}</span>) : null}
            {data.tagline && data.homepage ? (<span> - </span>) : null}
            {data.homepage ? (<span><a className={"text-white text-decoration-none"} href={data.homepage} target={"_blank"}>{data.homepage}</a></span>) : null}
        </section>
    )
}

export const MenuComponent = ({data}) => {
    return (
        <section className={"movie-menu-bar"}>
            <div className={"genre-container"}>
                <Genres genres={data.genres} />
            </div>
            {data.hasOwnProperty('seasons')
                ? (
                    <>
                        <div className={'seasons'}>
                            <h6 className={"heading"}>
                                <strong>
                                    Seasons
                                </strong>
                            </h6>
                            <span>{data.number_of_seasons}</span>
                        </div>
                        <div className={'episodes'}>
                            <h6 className={"heading"}>
                                <strong>
                                    Episodes
                                </strong>
                            </h6>
                            <span>{data.number_of_episodes}</span>
                        </div>
                        <div className={'status'}>
                            <h6 className={"heading"}>
                                <strong>
                                    Status
                                </strong>
                            </h6>
                            <span>{data.status}</span>
                        </div>
                    </>
                )
                : (
                    <>
                        <div className={'release'}>
                            <h6 className={"heading"}>
                                <strong>
                                    {data.status}
                                </strong>
                            </h6>
                            <span>{dateFormatter(data.release_date)}</span>
                        </div>
                        <div className={'duration'}>
                            <h6 className={"heading"}>
                                <strong>
                                    Duration
                                </strong>
                            </h6>
                            <span>{getDuration(data.runtime)}</span>
                        </div>
                    </>
                )}
            <div className={"rating"}>
                <h6 className={"heading"}>
                    <strong>
                        Rating
                    </strong>
                </h6>
                <svg className={"mb-1"} width={"13px"} id="Capa_1" x="0px" y="0px" viewBox="0 0 47.94 47.94" style={{ enableBackground:"new 0 0 47.94 47.94", marginRight: '.2rem' }}><path style={{ fill: "#E71"}} d="M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757  c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042  c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685  c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528  c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956  C22.602,0.567,25.338,0.567,26.285,2.486z"/><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
                <span>{parseFloat(data.vote_average).toFixed(1)}</span>
            </div>
            <div className={"languages"}>
                <h6 className={"heading"}>
                    <strong>
                        Languages
                    </strong>
                </h6>
                <span className={"text-uppercase"}>{data.hasOwnProperty('spoken_languages') ? data.spoken_languages.map(language => `${language.iso_639_1} `) ?? "TBA" : null}</span>
            </div>
        </section>
    )
}

export const PosterAndVideo = ({data, dataVideos}) => {
    return (
        <section className={"movie-body mt-3"}>
            <div className={"movie-info"}>
                <div className={"poster"}>
                    <img width={data.poster_path === null ? '300px' : null} height={data.poster_path === null ? "450px" : null} src={data.poster_path !== null ? process.env.REACT_APP_API_POSTER_PATH + data.poster_path : '/no_image.png'} alt={data.name ? data.name : data.title}/>
                </div>
                <div className={"overview"}>
                    {
                        dataVideos.length > 0
                            ? <YoutubeEmbed embedId={dataVideos[0].key} width={"100%"} height={"450px"} />
                            : <div><h6 className={"no-movies"}>No video currently available.</h6></div>
                    }
                </div>
            </div>
            <div className={'overview-text'}>
                <p>{data.overview}</p>
            </div>
        </section>
    )
}

export const MoreVideos = ({dataVideos}) => {
    return (
        <section className={"more-videos"}>
            <Splide options={sliderOptions}>
                <MoreVideosSlider moreVideos={dataVideos} width={"33.33%"} height={"400px"} />
            </Splide>
        </section>
    )
}

export const AuthorComponent = ({data}) => {
    return (
        <section className={"author-section"}>
            <h5 className={"header"}>
                <strong>
                    {data.created_by.length > 1 ? "Authors" : "Author"}
                </strong>
            </h5>
            <div className={'author d-flex'}>
                <Author createdBy={data.created_by} />
            </div>
        </section>
    )
}

export const RecommendedComponent = ({dataRecommended}) => {
    return (
        <section className={"recommendations"}>
            <h4 className={'recommendations-header'}>Other titles you may like</h4>
            <CategorySection cards={dataRecommended} />
        </section>
    )
}

export const AdditionalInformationComponent = ({data}) => {
    return (
        <section className={"additional-info"}>
            <h5 className={"header"}>
                <strong>
                    Additional Information
                </strong>
            </h5>
            <ul>
                {typeof data.first_air_date !== 'undefined' ? <li>First Air date: {dateFormatter(data.first_air_date)}</li> : null}
                {typeof data.episode_run_time !== 'undefined' ? <li>Episode duration: approx {getDuration(data.episode_run_time[0])}</li> : null}
                {typeof data.last_air_date !== 'undefined' ? <li>Last Air date: {dateFormatter(data.last_air_date)}</li> : null}
                {typeof data.last_episode_to_air !== 'undefined' ? <li>Last episode to air: {data.last_episode_to_air.name}</li> : null}
                {typeof data.last_episode_to_air !== 'undefined' ? <li>Last episode duration: {getDuration(data.last_episode_to_air.runtime)}</li> : null}
                {typeof data.last_episode_to_air !== 'undefined' ? <li>Rating last episode: {parseFloat(data.last_episode_to_air.vote_average).toFixed(1)}</li> : null}
            </ul>
        </section>
    );
}

const Seasons = ({seasons}) => {
    let seasonsToShow = [];

    if (typeof seasons !== 'undefined') {
        seasons.forEach(season => {
            if (season.season_number !== 0) {
                seasonsToShow.push(
                    <SplideSlide key={season.id}>
                        <Card
                            originalTitle={`Season ${season.season_number}`}
                            posterPath={season.poster_path !== null ? process.env.REACT_APP_API_POSTER_PATH + season.poster_path : "/no_image.png"}
                            voteAverage={parseFloat(season.vote_average).toFixed(1)}
                            overview={season.overview || "No information currently available"}
                            href={season.title ? `/movie/${season.id}` : `/serie/${season.id}`}
                        />
                    </SplideSlide>
                )
            }
        });
    }

    return seasonsToShow;
}

export const SeasonsComponent = ({seasons}) => {
    const options = {
        rewind: true,
        gap: "1rem",
        type: 'slider',
        arrows: 'slider',
        autoplay: false,
        start: 0,
        drag: true,
        pagination: false,
        perPage: 5,
        perMove: 1,
        updateOnMove: true,
        height: "auto",
        width: "100%",
    };

    return (
        <section className={"seasons-body"}>
            <Splide options={options}>
                <Seasons seasons={seasons} />
            </Splide>
        </section>
    )
}