import { Snackbar, Alert, Box } from '@mui/material';
import { useState } from 'react';

function ErrorMessage({ message }:{message:string}) {
  console.log("enter ErrorMessage");
  
  const [open, setOpen] = useState(true);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        position: 'absolute',
        width: '100%',
      }}
    >
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={(()=>setOpen(false))}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Alert
          onClose={(()=>setOpen(false))}
          severity="error"
          sx={{
            backgroundColor: 'error.main',
            color: 'white',
            width: '100%',
            maxWidth: '400px',
          }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default ErrorMessage;