import { Box } from '@material-ui/core';
import { FC } from 'react';
import { useStyles } from './styles'; 
import suivBas from '../../images/suivBas.png'

export interface InfoMenuItem {
    name: string;
    url: string;
}

export interface MenuItemProps {
    info: InfoMenuItem;
    onClick?: (item: InfoMenuItem) => void;
    icon: any;
    background: string;
}

const MenuItem: FC<MenuItemProps> = ({
    info,
    onClick,
    background,
    icon
}) => {
    const classes = useStyles({background})();

    const handleClick = () => {
        onClick && onClick(info);
    }

    return (
        <Box className={classes.root} onClick={handleClick}>
            <Box className={classes.nameIconContainer}>
                <Box>
                    <img src={icon} alt={info.name} />
                </Box>
                <h2>{info.name}</h2>
            </Box>
            <img src={suivBas} alt="iconSuivBas"/>
        </Box>
    )
}

export default MenuItem;