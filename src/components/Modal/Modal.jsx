import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Modal, Overlay, BigImg } from './Modal.styled';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export class ModalBlock extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.toggleListener);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.toggleListener);
  }

  toggleListener = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  closeModalOver = e => {
    if (e.target === e.currentTarget) {
      this.props.closeModal();
    }
  };

  render() {
    const { onClick } = this.props;
    return createPortal(
      <Overlay onClick={this.closeModalOver}>
        <Modal>
          <BigImg src={onClick.imgUrl} alt="" />
        </Modal>
      </Overlay>,
      modalRoot
    );
  }
}
ModalBlock.propTypes ={
  onClick:PropTypes.func
}