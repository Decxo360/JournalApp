import {AppBar, Toolbar, Grid, Typography,IconButton} from '@mui/material'
import {MenuOutlined, LogoutOutlined} from '@mui/icons-material'
import { useDispatch } from 'react-redux';
import { startLogOut } from '../../store/auth';

export const NavBar = ({drawerWidth=240}) => {

    const dispatch = useDispatch();

    const onLogout = () =>{
        dispatch(startLogOut())
    }

  return (
   <AppBar 
    position='fixed'
    sx={{
        width:{sm: `calc(100% - ${ drawerWidth }px)`},
        ml:{sm:`${drawerWidth}px`}
    }}    >
        <Toolbar>
            <IconButton 
                color='inherit'
                edge='start'
                sx={{mr:2,display:{sm:'none'}}}
                >
                <MenuOutlined/>
            </IconButton>
            <Grid container direction={'row'} justifyContent='space-between'>
                <Typography variant='h6' noWrap component={'div'} alignItems='center'>Journal App</Typography>

                <IconButton color='error' onClick={onLogout}>
                    <LogoutOutlined/>
                </IconButton>
            </Grid>
        </Toolbar>
   </AppBar>
  )
}
