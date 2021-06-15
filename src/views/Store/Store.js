import React, { useEffect, useState } from "react";
import "./Store.css";
import { makeStyles } from "@material-ui/core/styles";
import { useCustomState } from "@/hooks";
import Api from "@/services/api";
import ObjectUtils from "@/utils/objectUtils";
import GridItem from "@/components/Grid/GridItem.js";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import GridContainer from "@/components/Grid/GridContainer.js";
import Table from "@/components/Table/Table.js";
import Tasks from "@/components/Tasks/Tasks.js";
import CustomTabs from "@/components/CustomTabs/CustomTabs.js";
import Danger from "@/components/Typography/Danger.js";
import Card from "@/components/Card/Card.js";
import CardHeader from "@/components/Card/CardHeader.js";
import CardIcon from "@/components/Card/CardIcon.js";
import CardBody from "@/components/Card/CardBody.js";
import CardFooter from "@/components/Card/CardFooter.js";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import ChartistGraph from "react-chartist";
import styles from "@/assets/jss/material-dashboard-react/views/dashboardStyle.js";
import tableStyles from "@/assets/jss/material-dashboard-react/components/tableStyle.js";
import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "@/variables/charts.js";
import EmailIcon from '@material-ui/icons/Email';
import HomeIcon from '@material-ui/icons/Home';
import PhoneIcon from '@material-ui/icons/Phone';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Home } from "@material-ui/icons";
import Pagination from '@material-ui/lab/Pagination';
import { IconButton, Link } from "@material-ui/core";

const card_styles = {
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


const useStyles = makeStyles(styles)
const useCardStyles = makeStyles(card_styles);
const useTableStyles = makeStyles(tableStyles);


const Store = () => {
  const classes = useStyles()
  const card_classes = useCardStyles();
  const tableClasses = useTableStyles();
  const [state, setState] = useCustomState({
    Store: [],
    currEditCategoryId: undefined,
    currEditCategoryTempName: undefined,
    pageInfo: {
      size: 6,
      page: 0,
      dataCount: 0,
      totalPages: 0,
      totalDataCount: 0,
    },
  });
  const loadPage = async () => {
    try {
      const { page, size } = state.pageInfo;
      const params = { page, size };
      const res = await Api.apiFindStore(params);
      const result = ObjectUtils.convertToCamelNaming(res.result);
      const stores = result.data || [];
      const pageInfo = result.pageInfo;

      setState({
        stores, pageInfo,
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
    <>
      <Card>
        <CardHeader color="primary">
          <h4 className={card_classes.cardTitleWhite}>Store</h4>
          <p className={card_classes.cardCategoryWhite}>
            Maintain store
          </p>
        </CardHeader>
        <CardBody>
        <div className={tableClasses.tableResponsive}>
          <GridContainer>
            {state.stores?.map((store, i) => {
              return (
                <GridItem xs={12} sm={12} md={4} key={i}>
                  <Card chart>
                    <CardHeader color="success">
                      <ChartistGraph
                        className="ct-chart"
                        data={dailySalesChart.data}
                        type="Line"
                        options={dailySalesChart.options}
                        listener={dailySalesChart.animation}
                      />
                    </CardHeader>
                    <CardBody>
                      <h3 className={classes.cardTitle}>{store.storeName}</h3>
                      <p className={classes.cardCategory}>
                        <span className={classes.successText}>
                          <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                        </span>{" "}
                        increase in today sales.
                      </p>
                      <HomeIcon /><h6 className={classes.cardTitle}>{store.state}{' '}{store.city}{' '}{store.street}</h6>
                      <EmailIcon /><h6 className={classes.cardTitle}>{store.email}</h6>
                    </CardBody>
                    <CardFooter chart>
                      <div className={classes.stats}>
                         <PhoneIcon />{store.phone} 
                      </div>                       
                         <Link  className={classes.stats} to="/admin/brands">see more</Link>           
                    </CardFooter>
                  </Card>
                </GridItem>
              );
            })}
          </GridContainer>
          <Pagination
            className={card_classes.centerPagination}
            count={state.pageInfo.totalPages}
            page={state.pageInfo.page + 1}
            onChange={handlePageChange}
            size="large"
          />
          </div>
        </CardBody>
      </Card>
    </>
  )
}

export default Store;