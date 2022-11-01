import { PropsWithChildren } from "react";
import { Dialog, DialogContent } from '@mui/material'

interface CommonDialogPros extends PropsWithChildren<{}> {
    open: boolean,
    handleClose: () => void;
}

export const CommonDialog = ({open, handleClose, children, ...rest}: CommonDialogPros) => {
    if (open) {
        return (
            <Dialog open={open} onClose={handleClose} {...rest} >
                <DialogContent>
                    {children}
                </DialogContent>
            </Dialog>
        );
    }
    return null;
}
