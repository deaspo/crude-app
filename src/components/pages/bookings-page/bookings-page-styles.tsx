import { styled } from '@mui/material/styles'

export const bookingsPageClasses = {
    bottomArea: 'bottomArea',
    fabContainer: 'fabContainer',
    addText: 'addText'
}

export const FabContainer = styled('div')(({theme}) => ({
    [`&.${bookingsPageClasses.fabContainer}`]: {
        display: "flex",
        flexGrow: 1,
        justifyContent: "flex-end",
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        pointerEvents: "none",
        "& *": {
            pointerEvents: "all"
        },
    }
}));

export const AddText = styled('div')(({theme}) => ({
    [`&.${bookingsPageClasses.addText}`]: {
        display: "block",
        marginRight: theme.spacing(1)
    }
}));
