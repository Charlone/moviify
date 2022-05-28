import Card from "./Card";
import {Splide, SplideSlide} from "@splidejs/react-splide";
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
        pagination: true,
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
                    originalTitle={card.title ? card.title : card.name}
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

export default CategorySection;