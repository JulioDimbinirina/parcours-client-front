
import { Box, Typography, withWidth } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { useEffect } from 'react';
import { useState } from 'react';
import { FC } from 'react';
import { useStyles } from './styles';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

export interface CustomModalProps {
    title?: string;
    open: boolean;
    onClose: () => void;
    showCloseBtn?: boolean;
}


const CustomModal: FC<CustomModalProps> = ({ open, onClose, children, title, showCloseBtn = true }) => {
    const classes = useStyles()();
    const [openLocal, setOpenLocal] = useState<boolean>(false);

    const handleCloseClick = () => {
        setOpenLocal(false);
        onClose();
    }

    useEffect(() => {
        setOpenLocal(open);
    }, [open])

    return (
        <Modal
            open={openLocal}
            onClose={onClose}
        >
            <Box className={classes.titleContainer}>
                <Typography variant="h2">{title}</Typography>
                {showCloseBtn &&
                    <Box onClick={handleCloseClick} className={classes.closeBtn}>
                        <Close />
                    </Box>
                }
            </Box>
            <Box className={classes.bodyContainer}>
                {children}
            </Box>
        </Modal>
    )
}

export default CustomModal;