import styled from 'styled-components';
import { useRef } from 'react';
import ModalPortal from '@utils/ui/ModalPortal';
import useOutSideClick from '@hooks/useOutsideClick';

type ModalProps = {
  onClose: () => void; // 모달창 닫기 함수를 넘겨받는다.
  children: React.ReactNode;
};

const Modal = ({ onClose, children }: ModalProps) => {
  const modalRef = useRef(null);

  const handleClose = () => {
    onClose();
  };

  // 모달 이외의 영역 클릭 시 닫히게 한다.
  useOutSideClick(modalRef, handleClose);

  return (
    <ModalPortal>
      <Overlay>
        <ModalWrap ref={modalRef}>{children}</ModalWrap>
      </Overlay>
    </ModalPortal>
  );
};

export default Modal;

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.05);
  z-index: 9999;
`;

const ModalWrap = styled.div`
  max-width: 600px;
  height: fit-content;
  border-radius: 15px;
  position: absolute; // fixed 인 부모 요소 기준으로 위치
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
