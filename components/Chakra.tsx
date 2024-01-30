import {
  ChakraBaseProvider,
  cookieStorageManager,
  localStorageManager,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import theme from "theme";

interface ChakraProps {
  cookies?: string;
  children: ReactNode;
}

export const Chakra = ({ children, cookies }: ChakraProps) => {
  return (
    <ChakraBaseProvider
      colorModeManager={cookies ? cookieStorageManager : localStorageManager}
      theme={theme}
    >
      {children}
    </ChakraBaseProvider>
  );
};
