import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import './FullMovie.scss';

const FullMovie = ({ match, moviesList }) => {
    const movieId = match.params.movieId;

    const fullMovie = moviesList.find(({ id }) => id === +movieId);

    if (!fullMovie) return <Redirect to="/" />;

    console.log('[fullMovie]', fullMovie);

    const {
        backdrop_path,
        poster_path,
        original_title,
        overview,
        release_date
    } = fullMovie;

    const imageUrl = 'https://image.tmdb.org/t/p/w500';

    return (
        <div
            className="FullMovie"
            style={{ backgroundImage: `url(${imageUrl}${backdrop_path})` }}
        >
            <h1>{original_title}</h1>
            
            <div className="ContentWrapper">
                <div className="ImageWrapper">
                    <img src={imageUrl + poster_path} alt={original_title} />
                </div>

                <div className="Content">
                    <strong>{release_date}</strong>
                    <p>{overview}</p>
                </div>
            </div>
        </div>
    );
};

FullMovie.propTypes = {
    moviesList: PropTypes.arrayOf(PropTypes.object.isRequired),
    match: PropTypes.object.isRequired
};

export default FullMovie;
