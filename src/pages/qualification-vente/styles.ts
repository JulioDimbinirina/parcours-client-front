import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            marginTop: theme.spacing(3),
            justifyContent: 'center'
        },
        rightNav: {
            width: theme.spacing(30),
            height: '100vh',
            borderRight: '1px solid #bdbdbd',
        },
        formContainer: {
            width: '100%',
            padding: theme.spacing(4),
            display: 'flex',
            flexDirection: 'column'
        },
        btnSave: {
            display: 'flex',
            justifyContent: 'center'
        },
        formContent: {
            width: '100%',
        },
        stepper: {
            marginBottom: theme.spacing(3)
        }
    }),
);