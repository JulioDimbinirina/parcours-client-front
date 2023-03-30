import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: theme.spacing(2),
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            [theme.breakpoints.up('sm')]: {
                justifyContent: 'space-between',
            }
        },
        seachBarContainer: {
            width: 200,
            height: 50,
            margin: theme.spacing(1)
        },
        textFieldContainer: {},
    }),
);