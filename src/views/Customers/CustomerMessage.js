import React,{useState} from 'react';
import Button from "@/components/CustomButtons/Button.js";
import CardBody from "@/components/Card/CardBody.js";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from '@material-ui/core';


const styles = {
    cardCategoryWhite: {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    cardTitleWhite: {
      color: "#FFFFFF",
      marginTop: "0px",
      minHeight: "auto",
      fontWeight: "300",
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      marginBottom: "3px",
      textDecoration: "none"
    }
  };

  const useStyles = makeStyles(styles);

const CustomerMessage = (props) => {
  const { mesOpen } = props;
  const classes = useStyles();
  return (
    <CardBody profile>
        <p className={classes.description}>
            color
        </p>
            <TextField>
            </TextField>
    <div>
     <Button color="primary" round>
        傳送
     </Button>
     <Button color="primary" round onClick = {()=>mesOpen(false)}>
        返回
      </Button>
    </div>
    </CardBody>
  );
}

export default CustomerMessage;