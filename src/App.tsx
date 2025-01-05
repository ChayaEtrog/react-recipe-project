
import { useReducer } from 'react';
import './App.css'
import Login from './component/Login'
import UserReducer, { UserContext, UserType } from './component/UserReducer';

function App() {
  const initialState: UserType = { firstName: "", lastName: "", email: "", password: "", address: "", phone: "" };
  const [user, userDispatch] = useReducer(UserReducer, initialState);

  return (
    <>
      <UserContext.Provider value={{ user, userDispatch }}>
        <Login />
      </UserContext.Provider>
    </>
  )
}

export default App
