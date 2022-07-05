import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor() {
    super();
    this.getFavourites = this.getFavourites.bind(this);
    this.state = {
      favorites: [],
    };
  }

  componentDidMount() {
    this.getFavourites();
  }

  async getFavourites() {
    const favorites = await getFavoriteSongs();
    console.log(favorites, 'func');
    this.setState({ favorites }, () => {
    });
  }

  render() {
    const { favorites } = this.state;
    console.log(favorites, 'render');
    const element = favorites.map((song) => (
      <MusicCard
        key={ song.trackId }
        musicObj={ song }
        favouriteSongs={ favorites }
      />));
    return (
      <div data-testid="page-favorites">
        <Header />
        { element }
      </div>
    );
  }
}

export default Favorites;
