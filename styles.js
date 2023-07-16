import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: system-ui;
    padding: 0 25px 90px;
    background-color: #fdfbfb;
  }

  .rdp {
  --rdp-cell-size: 33px;
  --rdp-caption-font-size: 14px;
  --rdp-accent-color: #000;
  --rdp-background-color: #e7edff;
  --rdp-accent-color-dark: #000;
  --rdp-background-color-dark: #180270;
  --rdp-outline: 2px solid var(--rdp-accent-color); /* Outline border for focused elements */
  --rdp-outline-selected: 3px solid var(--rdp-accent-color); /* Outline border for focused _and_ selected elements */
  margin: 1em 1em 0;
}
`;
