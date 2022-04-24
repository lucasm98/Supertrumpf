import React, {useCallback} from "react";

import {useNavigate} from "react-router-dom";
import {AppBar, IconButton, Menu, MenuItem} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import ExitIcon from '@material-ui/icons/ExitToApp';
import { Link } from 'react-router-dom';
import { Toolbar} from "./Nav.styles";

interface Props {
  onLogout: () => void;
}

function Nav({onLogout}: Props) {
  const [anchorEL, setAnchorEL] = React.useState<null|HTMLElement>(null);
  const navigate = useNavigate();
  const handelLogout = useCallback(()=> {
    onLogout();
    navigate("/");
  }, [onLogout]);

  const handelMenuOpen = useCallback(
    (event: React.MouseEvent<HTMLBaseElement>) =>
      setAnchorEL(event.currentTarget),
    [setAnchorEL]
  );

  const handelMenuClose = useCallback(()=> setAnchorEL(null), [setAnchorEL]);

  return(
    <AppBar>
      <Toolbar>
        <IconButton
          href=""
          edge="start"
          color="inherit"
          aria-label="Menu"
          onClick={handelMenuOpen}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="naviagtion-menu"
          anchorEl={anchorEL}
          keepMounted
          open={Boolean(anchorEL)}
          onClose={handelMenuClose}
        >
          <MenuItem onClick={handelMenuClose}>
            <Link to="/game">Game</Link>
          </MenuItem>
          <MenuItem onClick={handelMenuClose}>
            <Link to="/admin">Admin</Link>
          </MenuItem>
        </Menu>
        <IconButton
          edge="end"
          color="inherit"
          aria-label="Logout"
          onClick={handelLogout}
        >
          <ExitIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Nav;