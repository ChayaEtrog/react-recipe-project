import './App.css'
import { RouterProvider } from 'react-router';
import { router } from './Router';
import { Provider } from 'react-redux';
import store from './store/recipesStore';
import { useReducer } from 'react';
import UseReducer, { UserContext, UserType } from './component/UseReducer';

function App() {
  const initialState: UserType = { firstName: "", lastName: "", email: "", password: "", address: "", phone: "", userId: "" };
  const [user, userDispatch] = useReducer(UseReducer, initialState);

  return (
    <>
      <UserContext value={{ user, userDispatch }}>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </UserContext>
    </>
  )
}

export default App
