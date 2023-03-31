import { FallingLines } from 'react-loader-spinner'
import {Wrapper} from './Loader.styled'

export const Loader = ()=>{
    return (
      <Wrapper><FallingLines
      color="#3f51b5"
      width="100"
      visible={true}
      ariaLabel='falling-lines-loading'
    /></Wrapper>        
    )
    }