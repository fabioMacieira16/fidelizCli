import styled from 'styled-components';

const Box = styled.div`
  align-items: center;
  
  border-radius: 10px;
  display: flex;
  padding: 1rem;
`;

const BoxRight = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto;
  margin-left: 1em;
  &::after {
    content: "";
    position: relative;
    
    background-color: #9c9c9c;
    border-radius: 5px;
    height: 2px;
    top: 1rem;
    width: 100%;
  
  }
`;

const AwardsImg = styled.img`
  border-radius: 5px;
  width: 6rem;
  
  @media (min-width: 400px) {
    width: 8rem;
  }
`;

export { Box, BoxRight, AwardsImg };