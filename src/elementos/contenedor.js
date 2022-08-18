import styled from "styled-components";
import theme from "../theme";
const Contenedor = styled.div`
  background: ${theme.fondo_contenedor};
  width: 100%;
  max-width: 70rem; /*1110px*/
  height: 90vh;
  max-height: 60rem; /* 80px */
  overflow-y: auto;
  box-shadow: 0px 1.25rem 2.5rem rgba(0, 0, 0, 0.05);
  border-radius: 0.625rem; /* 10px */
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  z-index: 100;

  @media (max-width: 60rem) {
    /* 950px */
    height: 95vh;
    max-height: none;
  }
`;

export default Contenedor;
