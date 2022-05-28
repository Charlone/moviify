import React from 'react';
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import * as viewRequestedActions from "../../redux/actions/viewRequestedActions";
import * as activeSlugActions from "../../redux/actions/activeSlugActions";
import { connect } from "react-redux";
import "../../styles/Switch.scss";


class Switch extends React.Component {
    // componentDidMount() {
    //     const { viewRequested, actions } = this.props;
    // }

    handleOnChange = () => {
        this.props.actions.activeSlug(this.props.viewRequested === 'movies' ? 'popularSeries' : 'popularMovies');
        this.props.actions.viewRequested(this.props.viewRequested === 'movies' ? 'series' : 'movies');
    }

    render() {
        return (
            <div className={"switch-container align-self-end"}>
                <h6 className={"text-uppercase"}><strong>Movies</strong></h6>
                <label className="switch">
                    <input type="checkbox" name={"view-requested"} onChange={this.handleOnChange} checked={this.props.viewRequested !== 'movies' ? true : false} />
                    <span className="slider round"></span>
                </label>
                <h6 className={"text-uppercase"}><strong>Series</strong></h6>
            </div>
        );
    }
}

Switch.propTypes = {
    actions: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
    return {
        viewRequested: state.viewRequested,
        apiCallsInProgress: state.apiCallsInProgress,
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