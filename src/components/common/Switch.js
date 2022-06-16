import React from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import * as viewRequestedActions from "../../redux/actions/viewRequestedActions";
import * as activeSlugActions from "../../redux/actions/activeSlugActions";
import "../../styles/Switch.scss";

class Switch extends React.Component {
    handleOnChange = () => {
        this.props.actions.activeSlug(this.props.viewRequested === 'movies' ? 'popularSeries' : 'popularMovies');
        this.props.actions.viewRequested(this.props.viewRequested === 'movies' ? 'series' : 'movies');
    }

    render() {
        return (
            <section className={"switch-container align-self-end"}>
                <h6 className={"text-uppercase"}><strong>Movies</strong></h6>
                <label className="switch">
                    <input type="checkbox" name={"view-requested"} onChange={this.handleOnChange} checked={this.props.viewRequested !== 'movies' ? true : false} />
                    <span className="slider round"></span>
                </label>
                <h6 className={"text-uppercase"}><strong>Series</strong></h6>
            </section>
        );
    }
}

Switch.propTypes = {
    actions: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
    return {
        viewRequested: state.viewRequested,
        activeSlug: state.activeSlug,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            viewRequested: bindActionCreators(viewRequestedActions.loadViewRequested, dispatch),
            activeSlug: bindActionCreators(activeSlugActions.loadActiveSlug, dispatch),
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Switch);