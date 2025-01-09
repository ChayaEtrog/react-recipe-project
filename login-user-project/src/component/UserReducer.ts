import { createContext, Dispatch } from "react";

export type UserType = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    address: string,
    phone: string,
    userId:string
}

type Action = {
    type: 'CREATE_USER',
    data: UserType
} | {
    type: 'UPDATE_USER',
    data: Partial<UserType>,
}

export const UserContext = createContext<{
    user: UserType;
    userDispatch: Dispatch<Action>;
}>({
    user: { firstName: '', lastName: '', email: '', password: '', address: '', phone: '',userId: '' },
    userDispatch: () => null
});

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