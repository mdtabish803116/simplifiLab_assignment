import React, { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const SnackbarToast = ({ triggerOpen, message, severity, customStyles }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);

        // Automatically close the Snackbar after 5 seconds
        setTimeout(() => {
            setOpen(false);
        }, 5000);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    // Effect to open the Snackbar when triggerOpen changes
    useEffect(() => {
        if (triggerOpen) {
            handleOpen();
        }
    }, [triggerOpen]);

    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} sx={{ zIndex: 9999 }}>
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
