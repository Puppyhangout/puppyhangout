import { Button } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import { Card } from 'primereact/card';
import React from 'react';
import './app.css';
import { ActiveCall } from './components/active_call/active_call';
import { MainBarComponent } from './components/calls_bar/main_bar';
import { Login } from './components/login/login_page';
import { login_store } from './components/login/login_store';
import { PostCallReport } from './components/post_call_report/post_call_report';
import logo from './logo.png';
import { active_calls_store } from './stores/active_calls_store';

export const color_palette = {
  blue: '#007ad9',
  green: '#34a835'
}

const NoCallSelected = () => <center>
  <h2>Welcome dispatcher {login_store.username}</h2>
  <h2>Please select a call to begin.</h2>
  <br />
  <img width={150} src={logo} alt="Hatzoloh Logo"></img>
  <br/>
  <br/>
  <Button variant='outlined' onClick={() => login_store.logout()}>Logout</Button>
</center>


const CallIsSelected = observer(() =>
  <div className="main-grid">
    {/* PANEL LEFT */}
    <ActiveCall />
    {/* PANEL RIGHT */}
    <PostCallReport />
  </div>)

const MainPage = observer(() => <>
  <MainBarComponent />
  <br />
  <Card style={{ backgroundColor: 'gray', borderRadius: '20px', height: '100%' }}>
    { active_calls_store.selected_call_index >=0 ?
      <CallIsSelected /> :
      <NoCallSelected />
    }
    <br />
  </Card>

</>)





const App = observer(() => {

  return (
    login_store.token  // || true
      ? <MainPage />
      : <Login />

  )

})

export default App