import PropTypes from 'prop-types';
import React from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { logOut } from '../actions';

const Layer = (props) => {

    console.log(props);

    return (
        <Container className="menu">
            <ul>
                <li>
                    <NavLink activeClassName="active" exact to="/">На главную</NavLink>
                </li>
                <li>
                    <NavLink activeClassName="active" to="/books">База знаний</NavLink>
                </li>
                <li>
                    <Link to="/" onClick={() => props.logOut()}>Выйти</Link>
                </li>
            </ul>
        </Container>
    )
}

Layer.propTypes = {
    logOut: PropTypes.func
}

const mapStateToProps = state => {
    return { ...state };
}

const mapActionsToProps = dispatch => {
    return {
        logOut: () => dispatch(logOut())
    }
}

export const Menu = connect(mapStateToProps, mapActionsToProps)(Layer);
