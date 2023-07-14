import {Routes, Route} from 'react-router-dom'
import Home from './components/home'
import {SignUp} from './components/signup'
import {Login} from './components/login'
import {ForgotPassword} from './components/forgotPassword'
import {ForgotPasswordConfirm} from './components/forgotPasswordConfirm'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element = {<Home />} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/forgotpassword" element={<ForgotPassword/>} />
        <Route path="/password_recovery_confirmation" element={<ForgotPasswordConfirm/>} />
      </Routes>
    </>
  )
}

export default App
