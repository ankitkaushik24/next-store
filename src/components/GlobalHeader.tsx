import { useUserService } from "@/services/UserServiceProvider";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";

export default function GlobalHeader() {
  const { currentUser, logout } = useUserService();

  return (
    <AppBar position="static">
      <Toolbar>
        <span>The Web Store {currentUser?.username}</span>
        <span className="flex-1"></span>
        <Button color="inherit" variant="outlined" onClick={() => logout()}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}
