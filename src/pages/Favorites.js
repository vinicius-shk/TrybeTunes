import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor() {
    super();
    this.getFavourites = this.getFavourites.bind(this);
    this.buildComponent = this.buildComponent.bind(this);
    this.updateFavourites = this.updateFavourites.bind(this);
    this.state = {
      isLoading: true,
      favorites: [],
    };
  }

  componentDidMount() {
    this.getFavourites();
  }

  // componentDidUpdate() {
  //   this.updateFavourites();
  // }

  async getFavourites() {
    const favorites = await getFavoriteSongs();
    this.setState({ favorites, isLoading: false });
  }

  updateFavourites() {
    this.setState({ isLoading: true });
    this.getFavourites();
  }

  buildComponent() {
    const { favorites } = this.state;
    const element = favorites.map((song) => (
      <MusicCard
        key={ song.trackId }
        musicObj={ song }
        favouriteSongs={ favorites }
      />));
    return element;
  }

  render() {
    const { isLoading } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-favorites">
          { isLoading ? <Loading /> : this.buildComponent() }
        </div>
      </>
    );
  }
}

export default Favorites;
