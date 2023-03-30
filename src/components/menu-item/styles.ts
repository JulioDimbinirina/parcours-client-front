import { createStyles, makeStyles, Theme } from "@material-ui/core";

interface StyleMenuItemProps {
    background: string;
}

export const useStyles = ({ background }: StyleMenuItemProps) => makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: 150,
            height: 70,
            color: '#ffffff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background,
            cursor: 'pointer',
            '&:hover': {
                background: '#cc0000',
            },
            padding: theme.spacing(2),
            borderRadius: 4,
            margin: theme.spacing(1),
            [theme.breakpoints.up('md')]: {
                margin: 0
            }
        },
        nameIconContainer: {
            '& img': {
                width: 35,
                height: 30,
                objectFit: 'cover',
            },
            '& h2': {
                margin: 0,
                fontSize: 14,
                fontWeight: 'normal',
            },
        }
    }),
);