import { Button } from './Button.styled';
import PropTypes from 'prop-types';

export const ButtonMore = ({ onClick }) => {
  return (
    <Button type="button" onClick={onClick}>
      More
    </Button>
  );
};
Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
