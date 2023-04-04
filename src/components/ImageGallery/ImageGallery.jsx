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
    buttonOn: false,
    query: ' ',
  };

  static getDerivedStateFromProps(props, state) {
    if (state.query !== props.query) {
      return { page: 1, query: props.query };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    if (prevProps.query !== this.props.query) {
      this.setState({ array: [] });
      console.log('1');
      this.getPage();
    }
    if (prevState.page !== page && page !== 1) {
      this.getPage();
    }
  }

  getPage = async () => {
    const { page, query } = this.state;
    this.setState({ isLoading: true });
    try {
      const data = await fetchImg(query, page);
      if (data.hits.length === 0) {
        this.setState({ array: [] });
        this.errorMes();
      }

      data.hits.length === 12
        ? this.setState({ buttonOn: true })
        : this.setState({ buttonOn: false });

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

  errorMes() {
    Notiflix.Report.failure('No pictures');
  }

  openModal = modaldata => {
    this.setState({ bigImgUrl: modaldata });
  };

  closeModal = () => {
    this.setState({ bigImgUrl: null });
  };

  render() {
    const { array, isLoading, bigImgUrl, buttonOn } = this.state;

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
        {buttonOn && <ButtonMore onClick={this.changePage} />}
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

// export const Gallery = ({ queryIn }) => {
//   const [array, setArray] = useState([]);
//   const [page, setPage] = useState(1);
//   const [isLoading, setIsLoading] = useState(false);
//   const [bigImgUrl, setBigImgUrl] = useState(null);
//   const [buttonOn, setButtonOn] = useState(false);
//   const [query, setQuery] = useState('');

//   useEffect(() => {
//     if (queryIn) {
//       setPage(1);
//       setArray([]);
//       setQuery(queryIn);
//     }
//   }, [queryIn]);

//   useEffect(() => {
//     if (query ?? page !== 1) {
//       getPage();
//     }
//   }, [query, page]);

//   const getPage = async () => {
//     setIsLoading(true);
//     try {
//       const data = await fetchImg(query, page);
//       if (data.hits.length === 0) {
//         setArray([]);
//         errorMes();
//       }
//       data.hits.length === 12 ? setButtonOn(true) : setButtonOn(false);

//       setArray(page === 1 ? data.hits : [...array, ...data.hits]);
//     } catch (error) {
//       console.log(error.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const changePage = () => {
//     setPage(page + 1);
//   };

//   const errorMes = () => {
//     Notiflix.Report.failure('No pictures');
//   };

//   const openModal = modaldata => {
//     setBigImgUrl(modaldata);
//   };

//   const closeModal = () => {
//     setBigImgUrl(null);
//   };

//   return (
//     <>
//       <GalleryList>
//         {array.length > 0 &&
//           array.map(item => (
//             <GalleryItems
//               key={item.id}
//               img={item.webformatURL}
//               bigimg={item.largeImageURL}
//               user={item.user}
//               openModal={openModal}
//             />
//           ))}
//       </GalleryList>
//       {isLoading && <Loader />}
//       {buttonOn && <ButtonMore onClick={changePage} />}
//       {bigImgUrl && <ModalBlock onClick={bigImgUrl} closeModal={closeModal} />}
//     </>
//   );
// };
