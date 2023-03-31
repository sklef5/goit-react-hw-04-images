import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api';
const API = '34264308-22057ffdb03c712e66af4a89b';
const TYPE = 'photo';
const FOR_PAGINATION = '12';
const ORIENT = 'horizontal';

export const fetchImg = async (query, page)=> {
  return await axios.get(BASE_URL, {
      params: {
        key: API,
        q: query,
        image_type: TYPE,
        per_page: FOR_PAGINATION,
        orientation: ORIENT,
        page: page
      }
     }
  ).then((res)=>res.data)
}
