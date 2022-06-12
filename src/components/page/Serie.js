import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { loadSeriesData } from "../../redux/actions/seriesActions";
import Spinner from "../common/Spinner";
import Footer from "../common/Footer";
import { AdditionalInformationComponent, AuthorComponent, MenuComponent, MoreVideos, PosterAndVideo, RecommendedComponent, TitleComponent, SeasonsComponent } from "../common/CommonMovieSerieComponents";
import '../../styles/Movie.scss';

const Serie = ({series, loadSeriesData}) => {
    const {serie, serieVideos, seriesRecommended} = series
    let {id} = useParams();
    const [stopLoading, setStopLoading] = useState(false);
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        return () => {
            if (serie.length === 0) {
                loadSeriesData('serie', id);
            }

            if (serieVideos.length === 0) {
                loadSeriesData('serieVideos', id);
            }

            if (stopLoading) {
                return;
            } else if (seriesRecommended.length === 0) {
                loadSeriesData('seriesRecommended', id);
                setStopLoading(true);
            }

            setTimeout(() => {
                setIsLoading(false);
            }, 500)

        }
    }, [stopLoading]);

    return (
        <div className={'movie-page-container'}>
            {
                serie.length === 0 && serieVideos.length === 0 ? <Spinner /> :
                    <div className={"container movie-container"}>
                        <TitleComponent data={serie} />
                        <MenuComponent data={serie} />
                        <PosterAndVideo data={serie} dataVideos={serieVideos} />
                        {serieVideos.length > 0 && <MoreVideos dataVideos={serieVideos} />}
                        <div className={"seasons"}>
                            <div className={'header'}>
                                <h5>Seasons</h5>
                            </div>
                            <SeasonsComponent seasons={serie.seasons} />
                        </div>
                        <div className={'authors-and-info'}>
                            <div className={'authors-and-info-section'}>
                                {serie.created_by.length > 0 && <AuthorComponent data={serie} />}
                                <AdditionalInformationComponent data={serie} />
                            </div>
                        </div>
                        {seriesRecommended.length > 0 && <RecommendedComponent dataRecommended={seriesRecommended} />}
                    </div>
            }
            <Footer isLoading={isLoading} />
        </div>
    );
}

Serie.propTypes = {
    series: PropTypes.object.isRequired,
    loadSeriesData: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
    return {
        series: state.series,
        activeSlug: state.activeSlug,
        viewRequested: state.viewRequested,
    }
}

const mapDispatchToProps = {
    loadSeriesData,
}

export default connect(mapStateToProps, mapDispatchToProps)(Serie);