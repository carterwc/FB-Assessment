import React, { Component } from 'react';
import './App.css';
import { artistsUpdated, selectedArtistUpdated } from './reducers';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import ArtistCard from './components/ArtistCard';
import SelectedArtist from './components/SelectedArtist';
import { getArtists, getSelectedArtist } from './proxies';
import Button from '@material-ui/core/Button';

class App extends Component {
    componentDidMount() {
        const {
            match: { params },
        } = this.props;
        console.log('this.props', this.props);
        this.getArtists();
        if (params.artistID) {
            this.selectArtist(params.artistID);
        }
    }

    getArtists = () => {
        getArtists()
            .then(({ data }) => {
                this.props.artistsUpdated(data);
            })
            .catch(error => {
                this.props.artistsUpdated([]);
            });
    };

    selectArtist = artistID => {
        getSelectedArtist(artistID)
            .then(({ data }) => {
                // if artistID exists on the response data then run the function
                if (data.artistID) {
                    this.props.selectedArtistUpdated(data);
                } else {
                    // set selected artist as error object when object comes bacj
                    this.props.selectedArtistUpdated({
                        error: 'Error Loading Artist',
                    });
                }
            })
            .catch(error => {
                // display the 401 error message for the failed load
                this.props.selectedArtistUpdated({ error: error.message });
            });
    };

    handleSelectArtist = artistID => {
        this.props.history.push(artistID);
        this.selectArtist(artistID);
    };

    render() {
        const {
            artists,
            selectedArtist,
            match: { params },
        } = this.props;
        const selectedArtistID = params.artistID;
        return (
            <div className="artist-app">
                <div className="artist-list">
                    {artists.length ? (
                        artists.map(artist => (
                            <ArtistCard
                                key={artist.artistID}
                                artist={artist}
                                selectedArtistID={selectedArtistID}
                                handleSelect={this.handleSelectArtist}
                            />
                        ))
                    ) : (
                        <div className="error-list">
                            <div>An Error Occured Loading data</div>
                            <Button
                                variant="contained"
                                onClick={this.getArtists}
                            >
                                {' '}
                                Reload{' '}
                            </Button>
                        </div>
                    )}
                </div>

                <Paper className="summary-view">
                    {selectedArtist ? (
                        <SelectedArtist selectedArtist={selectedArtist} />
                    ) : (
                        <div className="artist-details">No Artist Selected</div>
                    )}
                </Paper>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        artists: state.artists,
        selectedArtist: state.selectedArtist,
    };
};

const mapDispatchToProps = {
    artistsUpdated,
    selectedArtistUpdated,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
