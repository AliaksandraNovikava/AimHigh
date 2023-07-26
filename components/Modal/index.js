import styled from "styled-components";

export const StyledModalBody = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const StyledModal = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: ${(props) => props.position};
  top: ${(props) => props.top};
  gap: 0.4rem;
  width: 330px;
  padding: 1.3rem;
  min-height: 250px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 15px;
  z-index: 22;
`;

export const StyledOverlay = styled.section`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 21;
`;

export default function Modal({ children, closeModal, position, top }) {
  return (
    <>
      <StyledModalBody>
        <StyledModal position={position} top={top} hidden>
          {children}
        </StyledModal>
        <StyledOverlay onClick={closeModal} />
      </StyledModalBody>
    </>
  );
}
