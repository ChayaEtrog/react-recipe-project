import { useContext, useRef, useState } from "react";
import { UserContext } from "./UserReducer";
import { Box, Button, Modal, TextField } from "@mui/material";

function FormModel({ setIsOpen, setIsLogedIn }: { setIsOpen: any, setIsLogedIn?: any }) {
    const { user, userDispatch } = useContext(UserContext);
    const [open, setOpen] = useState(true);
    const [isSubmitOk, setIsSubmitOk] = useState(true);

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
        const isNameValid = firstNameRef.current?.checkValidity() ?? false;
        const isPasswordValid = passwordRef.current?.checkValidity() ?? false;
        setIsSubmitOk(!(isNameValid && isPasswordValid));
    };

    const handleSubmit = () => {
        const newUserData = {
            firstName: firstNameRef.current?.value || "",
            lastName: lastNameRef.current?.value || "",
            email: emailRef.current?.value || "",
            password: passwordRef.current?.value || "",
            address: addressRef.current?.value || "",
            phone: phoneRef.current?.value || "",
        };

        if (!user.firstName) {
            userDispatch({ type: "CREATE_USER", data: newUserData });
            setIsLogedIn();       
        }

        else if (user.firstName !== newUserData.firstName) {
            userDispatch({ type: "UPDATE_USER", data: newUserData });
        }
        setIsOpen();
    }

    return <>
        <Modal open={open} onClose={() => setOpen(false)}>
            <Box sx={style} >
                <TextField label="first name" type="text" defaultValue={user.firstName} inputRef={firstNameRef} margin="dense" required onInput={handleInputChange}/>
                <TextField label="last name" type="text" defaultValue={user.lastName} inputRef={lastNameRef} margin="dense" />
                <TextField label="email" type='email' defaultValue={user.email} inputRef={emailRef} margin="dense" />
                <TextField label="password" defaultValue={user.password} type='password' inputRef={passwordRef} margin="dense" required onInput={handleInputChange}/>
                <TextField label="address" defaultValue={user.address} type='text' inputRef={addressRef} margin="dense"/>
                <TextField label="phon number" defaultValue={user.phone} type='tel' inputRef={phoneRef} margin="dense"/>
               <div> <Button  onClick={handleSubmit} variant="outlined" disabled={isSubmitOk}>Submit</Button></div>
            </Box>
        </Modal >
    </>

}

export default FormModel;