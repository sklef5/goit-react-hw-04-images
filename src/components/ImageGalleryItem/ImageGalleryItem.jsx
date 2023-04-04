import { GalleryImg, GalleryItem } from './/ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export const  GalleryItems =({ img, bigimg, user, openModal })=> {
    return (
      <GalleryItem onClick={() => openModal({ imgUrl: bigimg })}>
        <GalleryImg src={img} alt={user} />
      </GalleryItem>
    );
  }

GalleryItems.propTypes = {
  openModal: PropTypes.func,
  img: PropTypes.string.isRequired,
  bigimg: PropTypes.string.isRequired,
};
