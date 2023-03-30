import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
           width: '100%',
        },
        formControl: {
            width: '100%',
            marginBottom: theme.spacing(2),
        },
        TextField: {
            width: '100%'
        },
        warning: {
            color: 'orange'
        },
        option: {
            fontSize: 15,
            '& > span': {
              marginRight: 10,
              fontSize: 18,
            },
        },
        titleContactsContainer: {
            display: 'flex',
            alignItems: 'center',
            '& h3': {
                marginRight: theme.spacing(3),
            },
            flexWrap: 'wrap'
        },
        table: {},
        actionBtn: {
            cursor: 'pointer'
        }
    }),
);