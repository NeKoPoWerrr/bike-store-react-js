import React, { useEffect, useState } from "react";
import randomBool from 'random-bool';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "@/components/Grid/GridItem.js";
import GridContainer from "@/components/Grid/GridContainer.js";
import Card from "@/components/Card/Card.js";
import CardHeader from "@/components/Card/CardHeader.js";
import CardBody from "@/components/Card/CardBody.js";
import CustomInput from "@/components/CustomInput/CustomInput.js";
import {
  Table, TableHead, TableRow, TableBody, TableCell, IconButton,
} from "@material-ui/core";
import Pagination from '@material-ui/lab/Pagination';
import { Edit, Clear, Check, Delete } from "@material-ui/icons";
import Api from "@/services/api";
import { useCustomState } from "@/hooks";
import tableStyles from "@/assets/jss/material-dashboard-react/components/tableStyle.js";
import ObjectUtils from "@/utils/objectUtils";
import { SUCCESS_CODE } from "@/services/api/base/apiResponseCode";
import Button from "@/components/CustomButtons/Button.js";
import ShowProfile from "./ShowProfile";
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { Tooltip } from '@material-ui/core';

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  centerPagination: {
    padding: "32px",
    "& .MuiPagination-ul": {
      justifyContent: "center"
    }
  }
};



const useStyles = makeStyles(styles);
const useTableStyles = makeStyles(tableStyles);

const Customers = () => {
  const onlineColor = "#7CFC00";
  const offlineColor = "#808080";
  const classes = useStyles();
  const tableClasses = useTableStyles();
  const [profileData, setProfileData] = useState('')
  const [open, setOpen] = useState(false)
  const [state, setState] = useCustomState({
    customers: [],
    pageInfo: {
      size: 5,
      page: 0,
      dataCount: 0,
      totalPages: 0,
      totalDataCount: 0,
    },
  });

  const handleProfileData = (firstName,lastName) => {
    setOpen(true);
    setProfileData(firstName + ' ' + lastName);
  }

  const loadPage = async () => {
    try {
      const { page, size } = state.pageInfo;
      const params = { page, size };
      const res = await Api.apiFindCustomers(params);
      const result = ObjectUtils.convertToCamelNaming(res.result);
      const customers = result.data || [];
      const pageInfo = result.pageInfo;

      setState({
        customers, pageInfo
      });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadPage();
  }, [state.pageInfo.page, state.pageInfo.size]);


  const handlePageChange = (event, value) => {
    const pageInfo = state.pageInfo;
    pageInfo.page = value - 1;
    setState({
      pageInfo,
    });
  };



  return (
    <div>
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>Customer</h4>
          <p className={classes.cardCategoryWhite}>
            Maintain brands of customer
          </p>
        </CardHeader>
       <CardBody>
        { open ? 
          <ShowProfile
            name={profileData}
            open ={ setOpen }
          /> : ''}
          <div className={tableClasses.tableResponsive}>
            <Table>
              <TableHead className={tableClasses["primaryTableHeader"]}>
                <TableRow className={tableClasses.tableHeadRow}>
                  {[
                    { text: "ID", style: { width: "10%" } },
                    { text: "Name", style: {} },
                    { text: "Profile", style: { width: "10%" } },
                    { text: "Online", style: { width: "10%" } },
                  ].map((prop, key) => {
                    return (
                      <TableCell
                        className={tableClasses.tableCell + " " + tableClasses.tableHeadCell}
                        key={key}
                        style={prop.style}
                      >
                        {prop.text}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {state.customers.length === 0 && <TableRow>
                  <TableCell colSpan={3} style={{ padding: "128px", textAlign: "center" }}>
                    No Any Customer
                  </TableCell>
                </TableRow>}
                {state.customers.map((customer, i) => {
                  const resBool = randomBool();
                  const onOffColor = resBool ? onlineColor : offlineColor;
                  const onOffDes = resBool ? "上線" : "離線";

                  return (
                   <TableRow key={i}>
                      <TableCell className={tableClasses.tableCell}>
                        {customer.id}
                      </TableCell>
                      <TableCell className={tableClasses.tableCell}>
                        {customer.firstName}{' '}{customer.lastName}
                      </TableCell>
                      <TableCell className={tableClasses.tableCell}>
                        <Tooltip title="個人簡介" placement="bottom" arrow>
                          <IconButton
                            color="primary"
                            onClick = {()=>{handleProfileData(customer.firstName,customer.lastName)}}
                          >
                            <AccountCircleRoundedIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                      <TableCell className={tableClasses.tableCell}>
                      <Tooltip title={ onOffDes } placement="bottom" arrow>
                        <IconButton>
                          <FiberManualRecordIcon
                            style={{ color: onOffColor }}
                          />
                        </IconButton>
                      </Tooltip>  
                      </TableCell>

                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>

            <Pagination
              className={classes.centerPagination}
              count={state.pageInfo.totalPages}
              page={state.pageInfo.page + 1}
              onChange={handlePageChange}
              size="large"
            />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default Customers;