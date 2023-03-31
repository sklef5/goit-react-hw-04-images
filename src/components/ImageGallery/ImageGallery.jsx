import { Component } from 'react';
import { GalleryList } from './ImageGallery.styled';
import { GalleryItems } from '../ImageGalleryItem/ImageGalleryItem';
import { fetchImg } from '../API';
import { ButtonMore } from '../Button/Button';
import { Loader } from '../Loader/Loader';
import { ModalBlock } from '../Modal/Modal';
import Notiflix from 'notiflix';
import PropTypes from 'prop-types';

export class Gallery extends Component {
  state = {
    array: [],
    page: 1,
    isLoading: false,
    bigImgUrl: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    if (prevProps.setquery !== this.props.setquery) {   
      this.setState({array :[]}) 
      this.getPage();
    }
    if (prevState.page !== page && page !== 1) {
      this.getPage();
    }
  }
  errorMes() {
    Notiflix.Report.failure('No pictures');
  }

  getPage = async () => {
    const { setquery } = this.props;
    const { page } = this.state;
    this.setState({ isLoading: true });

    console.log(this.state.array)
    try {
      const data = await fetchImg(setquery, page);
      if (data.hits.length === 0) {
        this.setState({array :[]})
        this.errorMes();
      }
      this.setState(prev => ({
        array: page === 1 ? data.hits : [...prev.array, ...data.hits],
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  changePage = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  openModal = modaldata => {
    this.setState({ bigImgUrl: modaldata });
  };

  closeModal = () => {
    this.setState({ bigImgUrl: null });
  };

  render() {
    const { array, isLoading, bigImgUrl } = this.state;

    return (
      <>
        <GalleryList>
          {array.length > 0 &&
            array.map(item => (
              <GalleryItems
                key={item.id}
                img={item.webformatURL}
                bigimg={item.largeImageURL}
                user={item.user}
                openModal={this.openModal}
              />
            ))}
        </GalleryList>
        {isLoading && <Loader />}
        {array.length > 0 && <ButtonMore onClick={this.changePage} />}
        {bigImgUrl && (
          <ModalBlock onClick={bigImgUrl} closeModal={this.closeModal} />
        )}
      </>
    );
  }
}

Gallery.propTypes = {
  array: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number })),
};
