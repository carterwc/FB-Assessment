export default art => {
    const titles = {
        acting: 'Actor',
        direction: 'Director',
    };

    return titles[art] || 'No job Title';
};
