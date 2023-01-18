import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectCompare, setCompare, selectModal, setModal } from './settingsSlice';

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    overflow: 'auto',
    transform: 'translate(-50%, -50%)',
    width: '20vw',
    height: '50vh',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export function Settings() {
    const dispatch = useAppDispatch();

    const handleClose = () => {
        dispatch(setModal(false));
    }

    const modalOpen = useAppSelector(selectModal);
    const compare = useAppSelector(selectCompare);

    const handleComparisonClick = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setCompare(e.target.checked));
    }

    return (
        <div>
            <Modal
                open={modalOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{marginBottom: '20px', fontWeight: 'bold'}}>
                        Settings
                    </Typography>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox onChange={handleComparisonClick} checked={compare}/>} label="Comparison Mode" />
                    </FormGroup>

                </Box>
            </Modal>
        </div>
    );
}