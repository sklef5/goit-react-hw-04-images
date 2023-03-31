import { Component } from 'react';
import { GalleryImg, GalleryItem } from './/ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export class GalleryItems extends Component {
  render() {
    const { img, bigimg, user, openModal } = this.props;

    return (
      <GalleryItem onClick={() => openModal({ imgUrl: bigimg })}>
        <GalleryImg src={img} alt={user} />
      </GalleryItem>
    );
  }
}
GalleryItems.propTypes = {
  openModal: PropTypes.func,
  img: PropTypes.string.isRequired,
  bigimg: PropTypes.string.isRequired,
};
