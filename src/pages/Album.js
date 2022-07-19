import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.musicFunc = this.musicFunc.bind(this);
    this.getFavourites = this.getFavourites.bind(this);
    this.renderAlbum = this.renderAlbum.bind(this);
    this.state = {
      musicList: [],
      isLoading: true,
      favorites: undefined,
    };
  }

  componentDidMount() {
    const oneSecond = 1000;
    this.musicFunc();
    this.getFavourites();
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, oneSecond);
  }

  async getFavourites() {
    const favorites = await getFavoriteSongs();
    this.setState({ favorites });
  }

  async musicFunc() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    try {
      const musics = await getMusics(id);
      this.setState({ musicList: musics });
    } catch (error) {
      console.log(error);
    }
  }

  renderAlbum() {
    const { musicList, favorites } = this.state;
    const {
      artworkUrl100,
      artistName,
      collectionName } = musicList[0];
    const [, ...resto] = musicList;
    return (
      <>
        <img src={ artworkUrl100 } alt={ artistName } />
        <p data-testid="artist-name">{ artistName }</p>
        <p data-testid="album-name">{ collectionName }</p>
        {resto
          .map((musicObj) => (
            <MusicCard
              musicObj={ musicObj }
              key={ musicObj.trackId }
              favouriteSongs={ favorites }
            />
          ))}
      </>
    );
  }

  render() {
    const { isLoading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          { isLoading ? <Loading /> : this.renderAlbum() }
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.object,
  params: PropTypes.object,
  id: PropTypes.string,
}.isRequired;

export default Album;
