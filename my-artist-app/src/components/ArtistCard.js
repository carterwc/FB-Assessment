import React from 'react';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import classnames from 'classnames';
import convertJobTitle from '../utils/jobTitleMapper';

const ArtistCard = ({ artist, selectedArtistID, handleSelect }) => {
    const fullName = `${artist.firstName} ${artist.lastName}`;
    const isSelected = selectedArtistID === artist.artistID;
    const cardCn = classnames('artist-info', { '--selected': isSelected });
    const handleClick = () => {
        handleSelect(artist.artistID);
    };
    return (
        <Paper className={cardCn} onClick={handleClick}>
            <Avatar className="avatar" alt={fullName} src={artist.imageURL} />
            <div className="info">
                <div className="full-name">{fullName}</div>
                <div className="job-title">{convertJobTitle(artist.art)}</div>
            </div>
        </Paper>
    );
};

export default ArtistCard;
