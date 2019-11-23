import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const Layer = ({ component: Component, ...rest }) => {

    const token = localStorage.token;

    if (token == null) {
        return <Redirect to="/login" />
    }

    return (
        <Route {...rest} render={(props) => (
            <Component {...props} />
        )} />
    );
}

Layer.propTypes = {
    component: PropTypes.func
}

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(Layer);