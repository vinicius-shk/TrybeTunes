import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.musicFunc = this.musicFunc.bind(this);
    this.state = {
      musicList: [],
      isLoading: true,
      element: <span />,
    };
  }

  componentDidMount() {
    this.musicFunc();
  }

  async musicFunc() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    try {
      const musics = await getMusics(id);
      this.setState({ musicList: musics }, () => {
        const { musicList } = this.state;
        const [, ...resto] = musicList;
        const {
          artworkUrl100,
          artistName,
          collectionName } = musicList[0];
        const artistCard = (
          <>
            <img src={ artworkUrl100 } alt={ artistName } />
            <p data-testid="artist-name">{ artistName }</p>
            <p data-testid="album-name">{ collectionName }</p>
            {resto
              .map((musicObj) => (
                <MusicCard
                  musicObj={ musicObj }
                  key={ musicObj.trackId }
                />
              ))}
          </>
        );
        this.setState({ isLoading: false, element: artistCard });
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { isLoading, element } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          { isLoading ? <Loading /> : element }
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
