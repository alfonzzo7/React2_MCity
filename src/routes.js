import React from 'react';
import { Switch } from 'react-router-dom';

import './Resources/css/app.css';
import Layout from './Hoc/Layout';

import PrivateRoutes from './Components/AuthRoutes/PrivateRoutes';
import PublicRoutes from './Components/AuthRoutes/PublicRoutes';

import NotFound from './Components/ui/notFound';
import Home from './Components/Home/index';
import SingIn from './Components/SingIn/index';
import TheTeam from './Components/TheTeam/index';
import TheMatches from './Components/TheMatches/index';

import Dashboard from './Components/Admin/Dashboard';
import AdminMatches from './Components/Admin/Matches/index';
import AddEditMatch from './Components/Admin/Matches/AddEditMatch';
import AdminPlayers from './Components/Admin/Players/index';
import AddEditPlayer from './Components/Admin/Players/AddEditPlayer';

const Routes = (props) => {
  return (
    <Layout>
      <Switch>
        <PrivateRoutes {...props} exact component={AddEditPlayer} path='/admin_players/add_player'/>
        <PrivateRoutes {...props} exact component={AddEditPlayer} path='/admin_players/edit_player/:id'/>
        <PrivateRoutes {...props} exact component={AdminPlayers} path='/admin_players'/>
        <PrivateRoutes {...props} exact component={AddEditMatch} path='/admin_matches/add_match'/>
        <PrivateRoutes {...props} exact component={AddEditMatch} path='/admin_matches/edit_match/:id'/>
        <PrivateRoutes {...props} exact component={AdminMatches} path='/admin_matches'/>
        <PrivateRoutes {...props} exact component={Dashboard} path='/dashboard'/>
        <PublicRoutes {...props} exact component={TheMatches} path='/the_matches' restricted={false}/>
        <PublicRoutes {...props} exact component={TheTeam} path='/the_team' restricted={false}/>
        <PublicRoutes {...props} exact component={SingIn} path='/sing_in' restricted={true}/>
        <PublicRoutes {...props} exact component={Home} path='/' restricted={false}/>
        <PublicRoutes {...props} component={NotFound} restricted={false}/>
      </Switch>
    </Layout>
  )
}

export default Routes;
