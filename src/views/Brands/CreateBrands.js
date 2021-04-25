import React,{useState} from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from "@/components/CustomButtons/Button.js";

const CreateBrand = (props) => {
    const [Brandid, setBrandid] = useState('');
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    console.log("here is props",props);
    const handleInputChange = (e) => {
        const { value } = e.target;
        setBrandid(value);
      };
    const handleClose = () => {
        setOpen(false);
    };
    
    const handleSave = (Brandid) =>{
        props.onBrandCreate(Brandid);
        setOpen(false);
    }


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
                  name="Brandid"
                  label="品牌名稱"
                  type="text"
                  onChange={handleInputChange}
                  value={Brandid}
                  fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="danger">
                  關閉
          </Button>
                <Button onClick={handleSave} color="primary">
                  上傳
          </Button>
            </DialogActions>
        </Dialog>
    </>
    )
}

export default CreateBrand;