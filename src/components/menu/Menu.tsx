import { Box, Container, InputAdornment, TextField } from "@material-ui/core";
import { FC } from "react";
import { useStyles } from './styles';
import MenuItem, { InfoMenuItem } from "../menu-item";
import { menuItems } from './menus';
import { Search } from "@material-ui/icons";


const Menu: FC = () => {
    const classes = useStyles();

    const handleClick = (item: InfoMenuItem) => {
        alert(item.name);
    }

    return (
        <Container>
            <Box className={classes.root}>
                {menuItems.map((item, index) => (
                    <MenuItem key={index} {...item} onClick={handleClick} />
                ))}
                <Box className={classes.seachBarContainer}>
                    <form action="http://localhost/crm_outsourcia" method="POST">
                        <TextField
                            size="small"
                            id="outlined-basic"
                            label="Recherche"
                            variant="outlined"
                            name="n_devis_rapide"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Search  />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </form>
                </Box>
            </Box>
        </Container>

    )
}

export default Menu;