import { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loadActiveSlug } from "../../redux/actions/activeSlugActions";
import { loadViewRequested } from "../../redux/actions/viewRequestedActions";
import { loadActorsData } from "../../redux/actions/actorsActions";
import { FetchAll } from "../common/DataHandle";
import ActorsSection from "../common/ActorsSection";
import Spinner from "../common/Spinner";
import Footer from "../common/Footer";

const Actors = ({actors, loadActorsData}) => {
    const { popularActors } = actors;
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        if (popularActors.length === 0) {
            FetchAll(loadActorsData, actors, 'popularActors');
            setIsLoading(false);
        }

        return () => {};
    }, [popularActors, actors]);


    return (
        <main className={'actors-container'}>
            <section className={"container"}>
                <h4 className={"subheading text-white mt-4"}>Most Popular</h4>
                {!popularActors.length && <Spinner />}
                {
                    popularActors.length > 0 &&
                    <section className={"popular-actors-section"}>
                        <ActorsSection popularActors={popularActors} />
                    </section>
                }
            </section>
            <Footer isLoading={isLoading} />
        </main>
    );
}

Actors.propTypes = {
    loadActorsData: PropTypes.func.isRequired,
    actors: PropTypes.object.isRequired,
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
    loadActiveSlug,
    loadViewRequested,
    loadActorsData,
}

export default connect(mapStateToProps, mapDispatchToProps)(Actors);