import PropTypes from 'prop-types';
import React from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from '../routes/PrivateRoute';
import '../styles/app.scss';
import { Books } from './Books';
import { Home } from './Home';
import { LoginForm } from '../components/LoginForm';
import { Menu } from '../components/Menu';
import { Login } from '../pages/Login';
import Sidebar from 'react-sidebar';
import { logInWithToken } from '../actions/index';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: false
        }
    }

    componentDidMount() {
        this.props.logInWithToken();
    }

    render() {

        const token = localStorage.token;

        return (
            <Sidebar
                sidebar={token == null ? <div className="sidebar"><LoginForm color="white" /></div> : <div className="sidebar"><Menu /></div>}
                open={this.state.menu}
                styles={{ sidebar: { background: '#292929' } }}
                onSetOpen={(open) => this.setState({ menu: open })}>
                <Row className="header">
                    <Col>
                        <Button variant="info" onClick={() => this.setState({ menu: !this.state.menu })}>Меню</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/login" component={Login} />
                            <PrivateRoute path="/books" component={Books} />
                        </Switch>
                    </Col>
                </Row>
            </Sidebar>
        )
    }
}

App.propTypes = {
    user: PropTypes.object,
    logInWithToken: PropTypes.func
};

const mapActionsToProps = dispatch => {
    return {
        logInWithToken: () => dispatch(logInWithToken())
    }
}

const mapStateToProps = state => {
    return { ...state }
}

export default connect(mapStateToProps, mapActionsToProps)(App);