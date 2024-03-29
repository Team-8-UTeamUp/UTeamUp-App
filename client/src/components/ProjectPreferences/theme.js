import { extendTheme, theme } from "@chakra-ui/react";

const colors = {
  "main-bg": "#FFFFFF", // main background color

  "white-text": "#FFFFFF", // text color
  "subtle-text": "#000000", // headding color

  "column1-bg": "#FFFFFF", // background for proj list
  "column2-bg": "#FC8E28", // background for top 5
  "column-border": "#C2C7C4",
  "column-header-bg": "#157636",

  "card-bg": "#FC8E28",
  "card-border": "#C2C7C4"
};

const fonts = {
  heading: "Montserrat",
  body: "Montserrat",
};

export default extendTheme({
  ...theme,
  colors,
  fonts,
});