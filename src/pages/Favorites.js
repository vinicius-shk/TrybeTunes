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
    this.renderComponent = this.renderComponent.bind(this);
    this.state = {
      isLoading: true,
      favorites: [],
    };
  }

  componentDidMount() {
    this.getFavourites();
  }

  componentDidUpdate() {
    this.getFavourites();
  }

  async getFavourites() {
    const favorites = await getFavoriteSongs();
    setTimeout(() => {
      this.setState({ favorites, isLoading: false });
    });
  }

  buildComponent() {
    const { favorites } = this.state;
    return favorites.map((song) => (
      <MusicCard
        key={ song.trackId }
        musicObj={ song }
        favouriteSongs={ favorites }
      />));
  }

  renderComponent() {
    return (
      <div data-testid="page-favorites">
        { this.buildComponent() }
      </div>);
  }

  render() {
    const { isLoading } = this.state;
    return (
      <>
        <Header />
        { isLoading ? <Loading /> : this.renderComponent() }
      </>
    );
  }
}

export default Favorites;
