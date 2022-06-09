import { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loadActiveSlug } from "../../redux/actions/activeSlugActions";
import { loadViewRequested } from "../../redux/actions/viewRequestedActions";
import { loadActorsData } from "../../redux/actions/actorsActions";
import ActorsSection from "../common/ActorsSection";
import Spinner from "../common/Spinner";
import Footer from "../common/Footer";

const Actors = ({activeSlug, viewRequested, actors, loadActorsData}) => {
    const { popularActors, actor, actorImage } = actors;
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        return () => {
            if (popularActors.length === 0) {
                loadActorsData('popularActors')
            }
            setIsLoading(false)
        };
    }, [popularActors]);


    return (
        <div className={'actors-container'}>
            <div className={"container"}>
                <h4 className={"subheading text-white mt-4"}>Most Popular</h4>
                {!popularActors.length && <Spinner />}
                {
                    popularActors.length &&
                    <section className={"popular-actors-section"}>
                        <ActorsSection popularActors={popularActors} />
                    </section>
                }
            </div>
            <Footer isLoading={isLoading} />
        </div>
    );
}

Actors.propTypes = {
    activeSlug: PropTypes.string.isRequired,
    viewRequested: PropTypes.string.isRequired,
    actors: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
    return {
        activeSlug: state.activeSlug,
        viewRequested: state.viewRequested,
        actors: state.actors,
    }
}

const mapDispatchToProps = {
    loadActiveSlug,
    loadViewRequested,
    loadActorsData,
}

export default connect(mapStateToProps, mapDispatchToProps)(Actors);