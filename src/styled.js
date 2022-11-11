import styled, { css, createGlobalStyle } from 'styled-components'

export const ResetStyles = createGlobalStyle`
:root {
    --primary-dark-theme: #4638c2;
    --secondary-dark-theme: #4c4f54;
    --success-dark-theme: #45a164;
    --info-dark-theme: #4799eb;
    --warning-dark-theme: #e1a82d;
    --danger-dark-theme: #d16767;
    --light-dark-theme: #666666;
    --dark-dark-theme: #333333;
  }
  
    html, body, #root {
        width: 100%;
        min-height:100%;
        font: 16px Montserrat;
        font-weight: 400;
    }
    body {
        position: relative;
        margin: 0;
        width: 100vw;
        min-height: 100vh;
        overflow-x: hidden;
    }

    root {
        overflow: auto;
    }
    
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        vertical-align: baseline;
        font-family: Montserrat;
    }
    button {
        font-family: Montserrat;
    }
    input, textarea {
        font: 16px Montserrat;
    }

    input[type=file],
    input[type=file]::-webkit-file-upload-button {
      cursor: pointer; 
    }
    input{
        padding: 7px !important;
    }
`

export default ResetStyles
