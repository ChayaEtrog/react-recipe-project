import { createContext, Dispatch } from "react"; 

// Defining the type of the user object
export type UserType = {
    firstName: string,  
    lastName: string,   
    email: string,      
    password: string,   
    address: string,    
    phone: string,      
    userId: string      
}

// Defining the possible actions that can be dispatched in the User context
type Action = {
    type: 'CREATE_USER', 
    data: UserType         
} | {
    type: 'UPDATE_USER',  
    data: Partial<UserType>, 
}

// Creating the UserContext with an initial state for the user and a dispatch function for actions
export const UserContext = createContext<{
    user: UserType;               
    userDispatch: Dispatch<Action>; 
}>({
    user: { firstName: '', lastName: '', email: '', password: '', address: '', phone: '', userId: '' },  
    userDispatch: () => null  
});

// Default reducer function that handles actions for updating user state
export default (state: UserType, action: Action): UserType => {
    switch (action.type) {
        case 'CREATE_USER':
            return { ...action.data };
        case 'UPDATE_USER':
            return { ...state, ...action.data };
        default:
            return state;
    }
}
