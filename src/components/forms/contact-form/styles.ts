import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {},
        formControl: {
            width: '100%',
            marginBottom: theme.spacing(2)
        },
        chips: {
            display: "flex",
            flexWrap: "wrap"
        },
        chip: {
            margin: 2
        },
    }),
);