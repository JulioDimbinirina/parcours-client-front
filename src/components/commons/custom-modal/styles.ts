import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStyles = (minWidth = 400, maxWidth = 500) => makeStyles((theme: Theme) =>
    createStyles({
        root: {
            minWidth,
            maxWidth,
            background: theme.palette.background.paper,
            minHeight: 400,
            borderRadius: '4px',
            overflow: 'hidden',
        },
        titleContainer: {
            color: '#ffffff',
            display: 'flex',
            justifyContent: 'space-between',
            padding: theme.spacing(2),
            background: theme.palette.primary.main,
            alignItems: 'center',
            '& h2': {
                margin: 0,
                fontSize: 24
            }
        },
        closeBtn: {
            width: 30,
            height: 30,
            borderRadius: '100%',
            background: theme.palette.primary.dark,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            '&:hover': {
                background: theme.palette.error.main,
                border: '1px solid #ffffff'
            },
        },
        bodyContainer: {
            width: '100%',
            padding: theme.spacing(2)
        },
        wrapper: {
            width: '100%',
            height: '100',
            overflow: 'auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }
    }),
);