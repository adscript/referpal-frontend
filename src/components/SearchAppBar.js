import React, { useContext, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { OrderContext } from '../contexts/OrderContext'

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  root: {
    flexGrow: 1,
    maxWidth: 600,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function SearchAppBar() {
  const { modifyQuery } = useContext(OrderContext)
  const classes = useStyles();

  let [timeOut, setTimeOut] = useState(0);
  const handleSearch = (e) => {
    let searchText = e.target.value;
    if(timeOut) clearTimeout(timeOut);
    timeOut = setTimeOut(() => {
      modifyQuery({keyword: searchText, resetSearch: true, offset: 0})
    }, 300);
  }

  return (
    <div className={classes.wrapper}>
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleSearch}
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
    </div>
  );
}
