import React,{useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "@/components/Grid/GridItem.js";
import GridContainer from "@/components/Grid/GridContainer.js";
import CustomInput from "@/components/CustomInput/CustomInput.js";
import Button from "@/components/CustomButtons/Button.js";
import Card from "@/components/Card/Card.js";
import CardHeader from "@/components/Card/CardHeader.js";
import CardAvatar from "@/components/Card/CardAvatar.js";
import CardBody from "@/components/Card/CardBody.js";
import CardFooter from "@/components/Card/CardFooter.js";
import Dialog from '@material-ui/core/Dialog';
import avatar from "@/assets/img/faces/marc.jpg";
import CustomerMessage from "./CustomerMessage";

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

const ShowProfile = (customerProps) => {
  const { open, name } = customerProps;
  const [mesOpen, setMesOpen] = useState(false)
  const classes = useStyles();
  return ( 
  <Dialog 
    fullWidth={true}
    open={true}
    disableBackdropClick ={true}
  >
    <GridItem>
      <Card profile>
        <CardAvatar profile>
          <img src={avatar} />
        </CardAvatar>
        { mesOpen ? <CustomerMessage mesOpen = { setMesOpen } />
        :<CardBody profile>
          <h4 className={classes.cardTitle}>{name}</h4>
          <p className={classes.description}>
            Don{"'"}t be scared of the truth because we need to restart the
                human foundation in truth And I love you like Kanye loves Kanye
                I love Rick Owens’ bed design but the back is...
              </p>
           <Button color="primary" round onClick = {()=>setMesOpen(true)}>
              私訊
           </Button>
           <Button color="primary" round onClick = {()=>open(false)}>
              返回
            </Button>
          </CardBody>
        }
      </Card>
    </GridItem >
  </Dialog>
  );
}

export default ShowProfile;