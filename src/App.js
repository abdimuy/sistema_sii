import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Home from './components/Home';
import Login from './pages/Login';
import Layout from './components/Layout';
import UpdatePersonalData from './pages/UpdatePersonalData';
import Register from './pages/Register';
import SelectMaterias from './pages/SelectMaterias';
import AddMateria from './pages/AddMateria';
import Horario from './pages/Horario';
import Users from './pages/Users';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path="/Login" component={ Login } />
            <Route exact path="/register" component={ Register } />
            <PrivateRoute exact path="/" component={ Home } />
            <PrivateRoute exact path="/updatepersonaldata" component={ UpdatePersonalData } />
            <PrivateRoute exact path="/SelectMaterias" component={ SelectMaterias } />
            <PrivateRoute exact path="/AddMateria" component={ AddMateria } />
            <PrivateRoute exact path="/Horario" component={ Horario } />
            <PrivateRoute exact path="/Users" component={ Users } />
          </Switch>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
