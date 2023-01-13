import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(4,1fr); 
    ${'' /* repeat 4x in one unique frame */}
    gap:12px;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`
  border: 16px solid #f3f3f3;
  border-top: 16px solid #3498db;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: ${rotate} 2s linear infinite;
`;

export const LoadingIndicator = () => <Loader />;