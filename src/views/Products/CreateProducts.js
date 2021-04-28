import React,{useState} from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from "@/components/CustomButtons/Button.js";
import "./CreateProducts.css";

const CreateProducts = (props) => {
    const [productID, setProductid] = useState('');
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    console.log("here is props",props);
    const handleInputChange = (e) => {
        const { value } = e.target;
        setProductid(value);
      };
    const handleClose = () => {
        setOpen(false);
    };
    
    const handleSave = () =>{
        console.log("here is productid",productID)
        props.onProductsCreate(productID);
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
          新增產品
        </Button>
        </div>
          <Dialog
            fullWidth={true}
            open={open}
            onClose={handleClose}
            disableBackdropClick={true}
            aria-labelledby="max-width-dialog-title">
            <DialogTitle id="form-dialog-title">
                請新增產品
            </DialogTitle>
            <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  name="productID"
                  label="產品名稱"
                  type="text"
                  onChange={handleInputChange}
                  value={productID}
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

export default CreateProducts;