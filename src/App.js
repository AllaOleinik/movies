import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import Toolbar from './components/Toolbar/Toolbar';
import Spinner from './components/UI/Spinner/Spinner';
import Movies from './components/Movies/Movies';
import Footer from './components/Footer/Footer';
import FullMovie from './components/FullMovie/FullMovie';
import Auth from './containers/Auth/Auth';
import * as moviesActions from './store/actions/movies';
import * as authActions from './store/actions/auth';
import './App.scss';

class App extends Component {
    state = {
        searchValue: ''
    }

    componentDidMount() {
        const { isAuthenticated, history } = this.props;

        if (!isAuthenticated) {
            return history.push('/auth');
        }
    }

    onChangeHandler = e => {
        this.setState({ searchValue: e.target.value });
    }

    fetchMoviesHandler = () => {
        const { searchValue } = this.state;
        const { updateMoviesList } = this.props;

        if (!searchValue) return;

        updateMoviesList(searchValue);
    }

    logoutWithRedirect = () => {
        const { logoutUser, history } = this.props;

        logoutUser();
        history.push('/auth');
    }

    render() {
        const { searchValue } = this.state;
        const { moviesList, isFetching, isAuthenticated } = this.props;

        return (
            <div className="App">
                <Toolbar
                    isAuthenticated={isAuthenticated}
                    searchValue={searchValue}
                    isFetching={isFetching}
                    onChangeHandler={this.onChangeHandler}
                    fetchMoviesHandler={this.fetchMoviesHandler}
                    logout={this.logoutWithRedirect}
                />

                <Switch>
                    {
                        isAuthenticated &&
                            <Route path="/movies/:movieId" render={props => (
                                <FullMovie
                                    {...props}
                                    moviesList={moviesList}
                                />
                            )} />
                    }

                    <Route path="/auth" component={Auth} />
                    <Route path="/spinner" component={Spinner} />

                    {
                        isAuthenticated &&
                            <Route path="/" exact render={props => (
                                <Fragment>
                                    { isFetching && <Spinner /> }

                                    <Movies list={moviesList} />
                                </Fragment>
                            )} />
                    }
                </Switch>

                <Footer />
            </div>
        );
    }
};

App.propTypes = {
    moviesList: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    moviesList: state.movies.moviesList,
    isFetching: state.movies.isFetching,
    isAuthenticated: !!state.auth.idToken
});

const mapDispatchToProps = dispatch => {
    return {
        updateMoviesList: searchValue => dispatch(moviesActions.updateMoviesList(searchValue)),
        logoutUser: () => dispatch(authActions.logoutUser())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(App));
