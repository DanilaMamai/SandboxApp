import React, { useState } from 'react';
import { Container, Form, FormGroup, Button } from 'react-bootstrap';
import { api } from '../tools/api';
import { connect } from 'react-redux';
import { setUser, setLoading } from '../actions';
import PropTypes from 'prop-types';
import { ScaleLoader } from 'react-spinners';

export const Layer = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const onLogin = () => {
        props.setLoading(true);
        api.onLogin(email, password)
            .then((res) => {
                setError('');
                localStorage.setItem("token", res.data)
                props.setUser({ email, password });
            })
            .catch(error => {
                console.log(error);
                if (error.response.status == 401)
                    setError('Некорректное имя или пароль.')
            })
            .finally(() => {
                props.setLoading(false);
            });
    }

    return (
        <Container className="login" style={{ color: props.color }}>
            <Form onSubmit={onLogin}>
                {error != '' && <span>{error}</span>}
                <FormGroup>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" value={email} onChange={event => setEmail(event.target.value)} disabled={props.loading} />
                </FormGroup>
                <FormGroup>
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control type="password" value={password} onChange={event => setPassword(event.target.value)} disabled={props.loading} />
                </FormGroup>
                <Button block className="button" onClick={onLogin}>Вход</Button>
                {props.loading && <Container fluid style={{ textAlign: "center", marginTop: 10 }}><ScaleLoader color={'#17a2b8'} /></Container>}
            </Form>            
        </Container>
    )
}

Layer.propTypes = {
    color: PropTypes.string,
    user: PropTypes.object,
    loading: PropTypes.bool,
    setUser: PropTypes.func,
    setLoading: PropTypes.func
}

const mapStateToProps = state => {
    return { ...state };
}

const mapActionsToProps = dispatch => {
    return {
        setUser: user => dispatch(setUser(user)),
        setLoading: loading => dispatch(setLoading(loading))
    }
}

export const LoginForm = connect(mapStateToProps, mapActionsToProps)(Layer);