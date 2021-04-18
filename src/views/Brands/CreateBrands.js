import React,{useState} from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from "@/components/CustomButtons/Button.js";

const CreateBrand = () => {

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
    <>
        <div width="100px" >
        <Button 
        color="primary"
        round
        onClick={handleClickOpen}
        >
        新增品牌
        </Button>
        </div>
        <Dialog
            fullWidth={true}
            open={open}
            onClose={handleClose}
            aria-labelledby="max-width-dialog-title">
            <DialogTitle id="form-dialog-title">
                請新增品牌
            </DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="品牌名稱"
                    type="email"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
          </Button>
                <Button onClick={handleClose} color="primary">
                    Subscribe
          </Button>
            </DialogActions>
        </Dialog>
    </>
    )
}

export default CreateBrand;