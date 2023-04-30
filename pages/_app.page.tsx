// pages/_app.js
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { AppProps } from "next/app";

export const theme = extendTheme({
  config: {
    initialColorMode: "dark",
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
