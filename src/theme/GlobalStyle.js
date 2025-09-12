import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
import theme from "./Theme";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: ${theme.fonts.body};
    color: ${theme.colors.text};
    margin: 0;
    padding: 0;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.fonts.display};
  }

  .accent-text {
    font-family: ${theme.fonts.accent};
  }

  .display-text {
    font-family: ${theme.fonts.display};
  }


      .page-wrapper{
        min-height: 100vh;
        display: flex;
        width: 100%;
        transition: margin-left 0.3s ease-in-out;
    }

    .content-wrapper{
        flex: 1;
        max-width: 1600px;
        margin-right: auto;
    
        //  margin-left: ${(props) => (props.isExpanded ? "200px" : "60px")};
  padding: 20px;
//   width: calc(100% - ${(props) => (props.isExpanded ? "200px" : "60px")});
  transition: margin-left 0.3s ease, width 0.3s ease;
    }
    .content-wrapper2{
        flex: 1;
        max-width: 100vw;
        max-height: 100vh;
   
    
        


  transition: margin-left 0.3s ease, width 0.3s ease;
    }


  * {
    -webkit-user-select: none !important;
    -moz-user-select: none !important;
    -ms-user-select: none !important;
    user-select: none !important;
  }

  /* …but allow it where users need to type or edit */
  input, textarea, [contenteditable="true"], .allow-select, [data-allow-select="true"] {
    -webkit-user-select: text !important;
    -moz-user-select: text !important;
    -ms-user-select: text !important;
    user-select: text !important;
  }

  /* Prevent long-press save/share on iOS */
  html, body {
    -webkit-touch-callout: none;
  }

  /* Make images harder to drag */
  img, video {
    -webkit-user-drag: none;
    user-drag: none;
  }

  /* OPTIONAL: block printing entirely
  @media print {
    html, body, #root {
      display: none !important;
    }
  }
  */
`;




export default GlobalStyle;
