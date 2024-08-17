import React, { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const SnackbarToast = ({ triggerOpen, message, severity, customStyles }) => {
    const [open, setOpen] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    useEffect(() => {
        if (triggerOpen) {
            setOpen(true);
        }
    }, [triggerOpen]);

    return (
        <Snackbar 
        open={open} 
        autoHideDuration={5000} 
        onClose={handleClose}  
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }} 
        sx={{ zIndex: 9999 }}>
            <Alert
                onClose={handleClose}
                severity={severity}
                sx={{
                    width: '100%',
                    color: customStyles?.textColor || 'inherit',
                    backgroundColor: customStyles?.backgroundcolor || 'inherit',
                    '& .MuiAlert-icon': {
                        color: customStyles?.iconColor || 'inherit'
                    }
                }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
};

export default SnackbarToast;
