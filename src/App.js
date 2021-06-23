import { observer } from 'mobx-react-lite';
import React from 'react';
import './app.css';
import { OldPage } from './components/old_page';
export const color_palette = {
  blue: '#007ad9',
  green: '#34a835'
}

// const NoCallSelected = () => <center>
//   <h2>Welcome dispatcher {login_store.username}</h2>
//   <h2>Please select a call to begin.</h2>
//   <br />
//   <img width={150} src={logo} alt="Hatzoloh Logo"></img>
//   <br/>
//   <br/>
//   <Button variant='outlined' onClick={() => login_store.logout()}>Logout</Button>
// </center>


// const CallIsSelected = observer(() =>
//   <div className="main-grid">
//     {/* PANEL LEFT */}
//     <ActiveCall />
//     {/* PANEL RIGHT */}
//     <PostCallReport />
//   </div>)

// const MainPage = observer(() => <>
//   <MainBarComponent />
//   <br />
//   <Card style={{ backgroundColor: 'gray', borderRadius: '20px', height: '100%' }}>
//     { active_calls_store.selected_call_index >=0 ?
//       <CallIsSelected /> :
//       <NoCallSelected />
//     }
//     <br />
//   </Card>

// </>)





const App = observer(() => {

  return (
    <OldPage />
    // login_store.token  // || true

    //   ? <MainPage />
    //   : <Login />

  )

})

export default App