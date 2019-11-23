import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { LoginForm } from '../components/LoginForm';

export const Layer = (props) => {

    if (props.user != null) {
        return <Redirect to="/" />
    }

    return (
        <LoginForm />
    )
}

Layer.propTypes = {
    user: PropTypes.object,
    setUser: PropTypes.func
}

const mapStateToProps = state => {
    return { ...state };
}

export const Login = connect(mapStateToProps)(Layer);