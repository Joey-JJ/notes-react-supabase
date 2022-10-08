import React, { useContext } from "react";
import { supabase } from "../../utils/supabaseClient";
import { sessionContext } from "../../utils/sessionContext";

import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Menu,
  Container,
  Tooltip,
  MenuItem,
  Button,
} from "@mui/material";

const ResponsiveAppBar = () => {
  const { session } = useContext(sessionContext);

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSignOut = async () => {
    setAnchorElUser(null);
    await supabase.auth.signOut();
  };

  return (
    <AppBar position="static" sx={{ mb: "2rem" }}>
      <Container maxWidth="l">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,

              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Notes App
          </Typography>
          {session && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <Button
                  onClick={handleOpenUserMenu}
                  color="primary"
                  size="small"
                >
                  {session.user.email}
                </Button>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleSignOut}>
                  <Typography textAlign="center">Sign out</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ResponsiveAppBar;
