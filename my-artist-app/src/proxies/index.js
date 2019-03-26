import axios from 'axios';

const api = axios.create({
    baseURL: 'https://fb-assessment.glitch.me',
});

export const getArtists = () => {
    return api.get('/artists');
};

export const getSelectedArtist = artistID => {
    return api.get(`/artists/${artistID}`);
};
