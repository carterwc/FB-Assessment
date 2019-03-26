import React from 'react';
import convertJobTitle from '../utils/jobTitleMapper';
import moment from 'moment';

const SelectedArtist = ({ selectedArtist }) => {
    if (selectedArtist.error) {
        return <div className="artist-details"> {selectedArtist.error} </div>;
    }

    const middleName = selectedArtist.middleName
        ? ` ${selectedArtist.middleName}`
        : '';
    const fullName = `${selectedArtist.firstName}${middleName} ${
        selectedArtist.lastName
    }`;
    const age = moment().diff(selectedArtist.dateOfBirth, 'years', false);
    return (
        <div className="artist-details">
            <div className="selected-artist-full-name"> {fullName}</div>
            <img
                className="selected-artist-image"
                alt={fullName}
                src={selectedArtist.imageURL}
            />
            <div className="select-artist-text">
                {' '}
                {convertJobTitle(selectedArtist.art)}
            </div>
            <div className="select-artist-text">
                {' '}
                {`${selectedArtist.dateOfBirth} (age ${age})`}
            </div>
            <div className="select-artist-text">
                {' '}
                {`Born in ${selectedArtist.placeOfBirth}`}
            </div>
        </div>
    );
};

export default SelectedArtist;
