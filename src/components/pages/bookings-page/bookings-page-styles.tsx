import { styled } from '@mui/material/styles'

export const bookingsPageClasses = {
    bottomArea: 'bottomArea',
    fabContainer: 'fabContainer',
    addText: 'addText'
}

export const BottomArea = styled('div')(({theme}) => ({
    [`&.${bookingsPageClasses.bottomArea}`]: {
        display: "flex",
        alignItems: "flex-end",
        margin: theme.spacing(3),
        pointerEvents: "none",
        "& *": {
            pointerEvents: "all"
        },
        position: "fixed",
        right: 0,
        bottom: 0,
        zIndex: theme.zIndex.modal
    }
}));

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
