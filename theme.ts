import {
  extendTheme,
  theme as chakraTheme,
  type ThemeConfig,
} from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "system",
  useSystemColorMode: true,
};

const { Button, Container, Drawer, Heading } = chakraTheme.components;

const theme = extendTheme({
  config,
  components: {
    Button,
    Container,
    Drawer,
    Heading,
  },
  styles: {
    global: {
      "html, body": {
        color: "black",
      },
    },
  },
});

export default theme;
