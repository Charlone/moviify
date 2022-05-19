import { useState } from "react";
import Switch from "../common/Switch";
import Card from "../common/Card";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import "../../styles/Home.scss";

const CategoryComponent = () => {
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

    let tempLoopData = [];

    for (let i = 0; i < 9; i++) {
        tempLoopData.push(
            <SplideSlide key={i}>
                <Card
                    originalTitle={"Spider-Man: No Way Home"}
                    posterPath={"https://m.media-amazon.com/images/M/MV5BZWMyYzFjYTYtNTRjYi00OGExLWE2YzgtOGRmYjAxZTU3NzBiXkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_QL75_UX140_CR0,0,140,207_.jpg 140w, https://m.media-amazon.com/images/M/MV5BZWMyYzFjYTYtNTRjYi00OGExLWE2YzgtOGRmYjAxZTU3NzBiXkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_QL75_UX210_CR0,0,210,311_.jpg 210w, https://m.media-amazon.com/images/M/MV5BZWMyYzFjYTYtNTRjYi00OGExLWE2YzgtOGRmYjAxZTU3NzBiXkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_QL75_UX280_CR0,0,280,414_.jpg 280w"}
                    voteAverage={"8.4"}
                    overview={"With Spider-Man's identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear, forcing Peter to discover what it truly means to be Spider-Man."}
                />
            </SplideSlide>
        );
    }

    return (
        <>
            <Splide options={sliderOptions}>
                {tempLoopData}
            </Splide>
        </>
    );
}

const Home = () => {
    const [activeSlug, setActiveSlug] = useState('popular');

    const handleOnClick = (e) => {
        setActiveSlug(e.target.dataset.slug);
    }

    const Headers = () => {
        const categoryArray = {
            headers: [
                {
                    label: "popular",
                    slug: "popular"
                },
                {
                    label: "latest",
                    slug: "latest"
                },
                {
                    label: "top rated",
                    slug: "top"
                },
                {
                    label: "upcoming",
                    slug: "upcoming"
                }
            ]
        };

        let headers = [];

        categoryArray.headers.forEach(categoryTitle => {
            headers.push(
                <h4 key={categoryTitle.slug} className={"category-header"} onClick={handleOnClick}>
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
                    {activeSlug === 'popular' && <CategoryComponent />}
                </div>
            </section>
        </div>
    );
}

export default Home;