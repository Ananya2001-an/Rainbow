import {Routes, Route} from 'react-router-dom'
import Home from './pages/home'
import {SignUp} from './pages/signup'
import {Login} from './pages/login'
import {ForgotPassword} from './pages/forgotPassword'
import {ForgotPasswordConfirm} from './pages/forgotPasswordConfirm'
import {Profile} from './pages/profile'
import {Explore} from './pages/explore'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element = {<Home />}>
          <Route index element={<Explore/>}/>
          <Route path='profile/:id' element={<Profile/>}/>
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
