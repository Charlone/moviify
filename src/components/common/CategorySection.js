import Card from "./Card";
import { truncateText } from "./CommonMovieSerieComponents";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/react-splide/css';

const CategorySection = ({cards}) => {
    const sliderOptions = {
        rewind: true,
        gap: "1rem",
        type: 'slider',
        arrows: 'slider',
        autoplay: false,
        start: 0,
        drag: true,
        pagination: false,
        perPage: 6,
        perMove: 1,
        updateOnMove: true,
        width: "100%",
        height: "auto"
    }

    let cardData = [];

    const cleanCards = cards.filter(card => card.overview !== '');

    cleanCards.forEach(card => {
        cardData.push(
            <SplideSlide key={card.id}>
                <Card
                    originalTitle={card.title ? truncateText(card.title, 17) : truncateText(card.name, 17)}
                    posterPath={card.poster_path !== null ? process.env.REACT_APP_API_POSTER_PATH + card.poster_path : "/no_image.png"}
                    voteAverage={parseFloat(card.vote_average).toFixed(1)}
                    overview={truncateText(card.overview, 43)}
                    href={card.title ? `/movie/${card.id}` : `/serie/${card.id}` }
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

export default CategorySection;