import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.saveMusic = this.saveMusic.bind(this);
    this.state = {
      musicObj: {},
      checked: false,
      loadingApi: false,
    };
  }

  componentDidMount() {
    const { musicObj } = this.props;
    this.setState({ musicObj });
  }

  onChange({ target }) {
    const { name, value, checked } = target;
    const newValue = target.type === 'checkbox' ? checked : value;
    this.setState({ [name]: newValue });
  }

  saveMusic() {
    this.setState({ loadingApi: true }, async () => {
      const { musicObj } = this.state;
      await addSong(musicObj);
      this.setState({ loadingApi: false });
    });
  }

  render() {
    const { musicObj } = this.props;
    const { trackName, previewUrl, trackId } = musicObj;
    const { checked, loadingApi } = this.state;
    const element = (
      <div>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label
          htmlFor={ `input-favourite-check${trackId}` }
        >
          Favorita
          <input
            type="checkbox"
            id={ `input-favourite-check${trackId}` }
            name="checked"
            data-testid={ `checkbox-music-${trackId}` }
            checked={ checked }
            onChange={ this.onChange }
            onClick={ this.saveMusic }
          />
        </label>
      </div>
    );
    return (
      <div>
        { loadingApi ? <Loading /> : element }
      </div>
    );
  }
}

MusicCard.propTypes = {
  splice: PropTypes.func,
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
}.isRequired;

export default MusicCard;
