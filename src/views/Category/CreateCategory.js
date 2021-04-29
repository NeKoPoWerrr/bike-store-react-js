import React,{useState} from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from "@/components/CustomButtons/Button.js";
import "./CreateCategory.css";

const CreateCategory = (props) => {
    const [categoryID, setcategoryiD] = useState('');
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    console.log("here is props",props);
    const handleInputChange = (e) => {
        const { value } = e.target;
        setcategoryiD(value);
      };
    const handleClose = () => {
        setOpen(false);
    };
    
    const handleSave = () =>{
        console.log("here is categoryID",categoryID)
        props.onCategorysCreate(categoryID);
        setOpen(false);
    }


    return (
    <>
      <div className="createcontainer">
        <Button 
          color="primary"
          round
          onClick={handleClickOpen}
          // style = {{float:"right"}}
        >
          新增種類
        </Button>
        </div>
          <Dialog
            fullWidth={true}
            open={open}
            onClose={handleClose}
            aria-labelledby="max-width-dialog-title">
            <DialogTitle id="form-dialog-title">
                請新增種類
            </DialogTitle>
            <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  name="categoryID"
                  label="種類名稱"
                  type="text"
                  onChange={handleInputChange}
                  value={categoryID}
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

export default CreateCategory;