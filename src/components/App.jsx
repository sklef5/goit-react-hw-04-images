import  {Form}  from '../components/Searchbar/Searchbar';
import { AppStyled } from './App.styled';
import { useState } from 'react';
import { Gallery } from '../components/ImageGallery/ImageGallery';
import PropTypes from 'prop-types';

export const App =()=> {
  const [query, setQuery] = useState('')

  const formHandler = (data) => {
    setQuery(data );
  };

    return (
      <AppStyled>
        <Form queryInput={formHandler} />
        <Gallery  query = {query}/>
      </AppStyled>
    );
  }

App.propTypes = {
  query: PropTypes.string
}
