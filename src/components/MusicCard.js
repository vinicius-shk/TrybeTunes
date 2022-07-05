import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { musicList } = this.props;
    console.log(musicList);
    const [, ...resto] = musicList;
    return (
      <div>
        { resto.map(({ trackName, previewUrl, trackId }) => (
          <div key={ trackId }>
            <p>{ trackName }</p>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              <code>audio</code>
              .
            </audio>
          </div>
        )) }
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
