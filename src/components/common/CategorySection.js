import Card from "./Card";
import { truncateText } from "./DataHandle";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/react-splide/css';

const CategorySection = ({cards, activeSlug}) => {
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
                    overview={card.overview !== ' ' ? truncateText(card.overview, 43) : "No information currently available"}
                    href={card.title ? `/movie/${card.id}` : `/serie/${card.id}` }
                />
            </SplideSlide>
        );
    });

    if (activeSlug) {
        cardData.push(
            <SplideSlide key={9999999}>
                <a href={`/${activeSlug}`} className="text-center" style={{
                    color: '#FFFFFF',
                    textDecoration: "none",
                    fontWeight: 900,
                    fontStyle: 'Anton, sans-serif',
                    fontSize: "xxx-large",
                    lineHeight: 1,
                    textShadow: '2px 2px black'
                }}>
                    <div className="card h-100" style={{
                        backgroundColor: '#E71'
                    }}>
                        <div className="card-body" style={{
                            display: "flex",
                            justifyContent: "center",
                            alignContent: "center",
                            alignItems: "center"
                        }}>
                            SHOW MORE
                        </div>
                    </div>
                </a>
            </SplideSlide>
        )
    }

    return (
        <>
            <Splide options={sliderOptions}>
                {cardData}
            </Splide>
        </>
    );
}

export default CategorySection;