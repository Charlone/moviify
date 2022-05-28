import { connect } from "react-redux";
import { loadActiveSlug } from "../../redux/actions/activeSlugActions";
import PropTypes from "prop-types";
import { loadViewRequested } from "../../redux/actions/viewRequestedActions";

const Actors = ({activeSlug, viewRequested}) => {
    return (
        <div></div>
    );
}

Actors.propTypes = {
    activeSlug: PropTypes.string.isRequired,
    viewRequested: PropTypes.string.isRequired,
}

function mapStateToProps(state) {
    return {
        activeSlug: state.activeSlug,
        viewRequested: state.viewRequested,
    }
}

const mapDispatchToProps = {
    loadActiveSlug,
    loadViewRequested,
}

export default connect(mapStateToProps, mapDispatchToProps)(Actors);