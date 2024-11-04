import { Container, ThemeProvider, studioTheme, Box } from "@sanity/ui";

function Layout({ children }: { children?: any }) {
  return (
    <ThemeProvider theme={studioTheme}>
      <Box style={{ backgroundColor: "#EEEFF3", minHeight: "100vh" }}>
        <Container width={2} padding={2}>
          {children}
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default Layout;
