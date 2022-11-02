import { styled } from '@mui/material/styles';
import { Grid } from "@mui/material";

export const formClasses = {
    buttonContainer: "buttonContainer",
    calenderInfo: "calenderInfo",
    gridItem: "gridItem"
}

export const FormButtonContainer = styled('div')(() => ({
    [`&.${formClasses.buttonContainer}`]: {
        display: "flex",
        justifyContent: "space-between"
    }
}));

export const CalenderInfoContainer = styled('div')(() => ({
    [`&.${formClasses.calenderInfo}`]: {
        display: "flex",
        justifyContent: "center",
        color: "red"
    }
}));

export const GridItemContainer = styled(Grid)(({theme}) => ({
    [`&.${formClasses.gridItem}`]: {
        display: "flex",
        justifyContent: "space-between",
        gap: theme.spacing(2)
    }
}));
