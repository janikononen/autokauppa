import {
  AppBar,
  Container,
  CssBaseline,
  Toolbar,
  Typography,
} from "@mui/material";
import Carlist from "./Carlist";

function App() {
  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Autokauppa</Typography>
        </Toolbar>
      </AppBar>
      <CssBaseline />
      <Carlist />
    </Container>
  );
}

export default App;
