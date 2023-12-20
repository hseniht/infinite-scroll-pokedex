import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {
  ChakraProvider,
  ColorModeProvider,
  ColorModeScript,
  extendTheme,
} from "@chakra-ui/react";
import "./index.css";

// Custom theme for dark mode
// const theme = extendTheme({
//   config: {
//     // initialColorMode: "light", // or 'dark'
//     initialColorMode: "light",
//     useSystemColorMode: false,
//   },
// });

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({ config });

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider theme={theme}>
    {/* <ColorModeScript initialColorMode={theme.config.initialColorMode} /> */}
    <ColorModeProvider
      initialColorMode={theme.config.initialColorMode}
      // options={{
      //   useSystemColorMode: false,
      // }}
    >
      <App />
    </ColorModeProvider>
  </ChakraProvider>
);
