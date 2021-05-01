import React,{useState} from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from "@/components/CustomButtons/Button.js";
import "./CreateBrand.css";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { IconButton, Tooltip } from '@material-ui/core';

const CreateBrand = (props) => {
  const [brandName, setBrandid] = useState('');
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setBrandid(value);
  };

  const handleClose = () => {
    setOpen(false);
  };
    
  const handleSave = () =>{
    console.log("here is brandid",brandName)
    props.onBrandCreate(brandName);
    setOpen(false);
  };


  return (
    <>
      <div className="createcontainer">
        <Tooltip title="新增產品" placement="bottom" arrow>
          <IconButton
            color="primary"
            onClick={handleClickOpen}
            // style = {{float:"right"}}
            >
              <AddCircleIcon style={{ fontSize: 40}}/>
          </IconButton>
        </Tooltip>
      </div>
        <Dialog
          fullWidth={true}
          open={open}
          onClose={handleClose}
          aria-labelledby="max-width-dialog-title"
          disableBackdropClick ={true}
          >
            <DialogTitle id="form-dialog-title">
              請新增品牌
            </DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  name="brandName"
                  label="品牌名稱"
                  type="text"
                  onChange={handleInputChange}
                  value={brandName}
                  fullWidth
                />
             </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="danger">
                    關閉
                  </Button>
                  
                  <Button onClick={handleSave} color="primary">
                    確定
                  </Button>
                </DialogActions>
          </Dialog>
    </>
  );
}

export default CreateBrand;