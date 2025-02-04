import axios from "axios";
import { UserType } from "../component/UseReducer";

export const handleSignup = async (newUserData: UserType) => {
    const res = await axios.post("http://localhost:3000/api/user/register", {
        email: newUserData.email,
        password: newUserData.password,
    });
    return res;
};

export const handleLogin = async (newUserData: UserType) => {
    const res = await axios.post("http://localhost:3000/api/user/login", {
        email: newUserData.email,
        password: newUserData.password,
    });
    return res;
};

export const handleUpdate = async (newUserData: UserType) => {
    const res = await axios.put(
        "http://localhost:3000/api/user",
        {
            email: newUserData.email,
            password: newUserData.password,
            firstName: newUserData.firstName,
            lastName: newUserData.lastName,
            address: newUserData.address,
            phone: newUserData.phone,
        },
        {
            headers: { "user-id": "" + newUserData.userId },
        }
    );
    return res;
};

export const handleGetById = async (userId: number) => {    
    const res = await axios.get(`http://localhost:3000/api/user/${userId}`);
    return res.data;
}