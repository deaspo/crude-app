import { styled } from '@mui/material/styles'

export const listClasses = {
    root: 'root',
    body: 'body',
    photo: 'photo',
    main: 'main',
    content: 'content',
    title: 'title',
    dateLocation: 'dateLocation',
    date: 'date',
    location: 'location',
    duration: 'duration',
    price: 'price',
    more: 'more',
}

export const ItemRoot = styled('div')(() => ({
    [`&.${listClasses.root}`]: {
        display: "flex",
        flexDirection: "row",
        width: "100%"
    }
}));

export const ItemPhoto = styled('div')(() => ({
    [`&.${listClasses.photo}`]: {
        padding: "4px"
    }
}));

export const ItemBody = styled('div')(() => ({
    [`&.${listClasses.body}`]: {
        display: "flex",
        flexDirection: "row",
        width: "100%"
    }
}));

export const ItemMain = styled('div')(() => ({
    [`&.${listClasses.main}`]: {
        display: "flex",
        flexDirection: "row",
        gap: "4px",
        width: "100%"
    }
}));

export const ItemContent = styled('div')(() => ({
    [`&.${listClasses.content}`]: {
        display: "flex",
        flexDirection: "column",
        padding: "4px",
        gap: "4px",
        width: "100%"
    }
}));

export const ItemDateLocation = styled('div')(() => ({
    [`&.${listClasses.dateLocation}`]: {
        display: "flex",
        flexDirection: "row",
        gap: "8px",
    }
}));

export const ItemMore = styled('div')(() => ({
    [`&.${listClasses.more}`]: {
        display: "block",
    }
}));
