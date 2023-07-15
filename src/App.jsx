import {Routes, Route} from 'react-router-dom'
import Home from './pages/home'
import {SignUp} from './pages/signup'
import {Login} from './pages/login'
import {ForgotPassword} from './pages/forgotPassword'
import {ForgotPasswordConfirm} from './pages/forgotPasswordConfirm'
import {Profile} from './pages/profile'
import {Explore} from './pages/explore'
import {Chats} from './pages/chats'
import {ChatView} from './pages/chatView'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element = {<Home />}>
          <Route index element={<Explore/>}/>
          <Route path='profile/edit/:id' element={<Profile/>}/>
          <Route path='chats' element={<Chats/>}/>
          <Route path='chats/view' element={<ChatView/>}/>
        </Route>
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/forgotpassword" element={<ForgotPassword/>} />
        <Route path="/password_recovery_confirmation" element={<ForgotPasswordConfirm/>} />
      </Routes>
    </>
  )
}

export default App
