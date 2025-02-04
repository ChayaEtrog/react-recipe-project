import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "./UseReducer";
import { Box, Button, Modal, TextField } from "@mui/material";
import ErrorMessage from "./ErrorMessage";
import { handleLogin, handleSignup, handleUpdate } from "../services/profileService";

function FormModel({ setIsOpen, type, setIsLogedIn }: { setIsOpen: Function, type: string, setIsLogedIn?: Function }) {
    const { user, userDispatch } = useContext(UserContext);
    const [isSubmitOk, setIsSubmitOk] = useState(true);
    const [open, setOpen] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const addressRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: '#f9f9f9',
        borderRadius: '16px',
        boxShadow: 24,
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    };

    const handleInputChange = () => {
        const isEmailValid = emailRef.current?.checkValidity() ?? false;
        const isPasswordValid = passwordRef.current?.checkValidity() ?? false;
        setIsSubmitOk(!(isEmailValid && isPasswordValid));
    };

    useEffect(() => {
        setIsSubmitOk(!(user.email && user.password));
    }, []);

    const handleSubmit = async () => {
        let newUserData = {
            firstName: firstNameRef.current?.value || "",
            lastName: lastNameRef.current?.value || "",
            email: emailRef.current?.value || "",
            password: passwordRef.current?.value || "",
            address: addressRef.current?.value || "",
            phone: phoneRef.current?.value || "",
            userId: user.userId || "",
        };

        try {
            if (type === "SIGNUP") {
                const res=await handleSignup(newUserData);
                newUserData.userId = res.data.userId;
                userDispatch({ type: "CREATE_USER", data: newUserData });
                setIsLogedIn?.();
            } else if (type === "LOGIN") {
                const res=await handleLogin(newUserData);
                newUserData = res.data.user;
                newUserData.userId = res.data.user.id;
                userDispatch({ type: "LOGIN_USER", data: newUserData });
                    setIsLogedIn?.();
            } else {
                await handleUpdate(newUserData);
                userDispatch({ type: "UPDATE_USER", data: newUserData });
            }
            setIsOpen(false);
        } catch (e: any) {
            if (e.response?.status === 401) setError("Invalid credentials");
            else if (e.response?.status === 422) setError("User already registered");
            else if (e.response?.status === 404) setError("User not found");
            else if(e.response?.status===403) setError("User is not loged in");
            else setError("An error occurred");
            console.error("Error during form submission:", e);
        }
    };

    return <>
        {(error) && <ErrorMessage message={error} setError={setError}/>}

        <Modal open={open} onClose={() =>{ setOpen(false); setIsOpen(false)}}>
            <Box sx={style} >
                <TextField label="email" type='email' defaultValue={user.email} inputRef={emailRef} margin="dense" required onInput={handleInputChange} />
                <TextField label="password" defaultValue={user.password} type='password' inputRef={passwordRef} margin="dense" required onInput={handleInputChange} />
                {(type === 'UPDATE') && (<>
                    <TextField label="first name" type="text" defaultValue={user.firstName} inputRef={firstNameRef} margin="dense" />
                    <TextField label="last name" type="text" defaultValue={user.lastName} inputRef={lastNameRef} margin="dense" />
                    <TextField label="address" defaultValue={user.address} type='text' inputRef={addressRef} margin="dense" />
                    <TextField label="phon number" defaultValue={user.phone} type='tel' inputRef={phoneRef} margin="dense" />
                </>)}
                <div > <Button onClick={handleSubmit} variant="outlined" disabled={isSubmitOk}>Submit</Button></div>
            </Box>
        </Modal >
    </>
}

export default FormModel;