import { createGlobalStyle } from "styled-components";

const Global = createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    font-family: 'poppins', sans-serif;
  }
  
  body {
  min-height: 100vh;
  background-color: #f2f2f2;
  display: flex;
  justify-content: center;
  align-items: flex-start; /* ou center */
  padding-top: 40px;
}
`;

export default Global;