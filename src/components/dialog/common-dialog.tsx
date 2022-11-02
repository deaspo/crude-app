import { PropsWithChildren } from "react";
import { Dialog, DialogContent, DialogTitle } from '@mui/material'

interface CommonDialogPros extends PropsWithChildren<{}> {
    open: boolean,
    handleClose?: () => void;
    title: string
}

export const CommonDialog = ({open, handleClose, title, children, ...rest}: CommonDialogPros) => {
    if (open) {
        return (
            <Dialog disableEscapeKeyDown open={open} {...rest} >
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    {children}
                </DialogContent>
            </Dialog>
        );
    }
    return null;
}
