import React, { useEffect, useState } from "react";
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

const Category = () => {
  const classes = useStyles();
  const tableClasses = useTableStyles();
  const [state, setState] = useCustomState({
    products: [],
    currEditProductId: undefined,
    currEditProductTempName: undefined,
    pageInfo: {
      size: 5,
      page: 0,
      dataCount: 0,
      totalPages: 0,
      totalDataCount: 0,
    },
  });

  const loadPage = async() => {
    try {
      const { page, size } = state.pageInfo;
      const params = { page, size };
      const res = await Api.apiFindCategory(params);
      console.log("res",res);
      const result = ObjectUtils.convertToCamelNaming(res.result);
      const products = result.data || [];
      const pageInfo = result.pageInfo;

      setState({
        products, pageInfo,
      });
      console.log("state",state);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadPage();
  }, [ state.pageInfo.page, state.pageInfo.size ]);

  const onProductsEdit = (product) => {
    setState({ 
      currEditProductId: product.id,
      currEditProductTempName: product.name,
    });
  }

  const onProductsSave = async(product) => {
    try {
      const payload = { name: state.currEditProductTempName };
      const res = await Api.apiUpdateProduct(product.id, payload);
      if (res.code === SUCCESS_CODE) {
        const { products } = state;
        products.filter((p) => p.id === product.id)[0].name = state.currEditProductTempName;
        setState({
          products,
          currEditProductId: undefined,
          currEditProductTempName: undefined,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  const onProductsCreate = async(props) =>{
    const productName = {name : props};
    try {
      console.log("product", productName);
      const res = await Api.apiCreateProducts(productName);
      if(res.code === SUCCESS_CODE){

        loadPage();
      }
    }catch(error){
      console.error(error);
    }
  }

  const onProductsDelete = async(product) => {
    try {
      const res = await Api.apiDeleteProduct(product.id);
      if (res.code === SUCCESS_CODE) {
        loadPage();
      }
    } catch (error) {
      console.error(error);
    }
  }

  const onCancel = () => {
    setState({
      currEditProductId: undefined,
      currEditProductTempName: undefined,
    });
  }

  const handlePageChange = (event, value) => {
    const pageInfo = state.pageInfo;
    pageInfo.page = value - 1;
    setState({ 
      pageInfo,
      currEditProductId: undefined,
      currEditProductTempName: undefined, 
    });
  }
;
  
  

  return (
    <div>
      {console.log("this page rendered")}
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>Products</h4>
          <p className={classes.cardCategoryWhite}>
            Maintain brands of products
          </p>
        </CardHeader>
        {/* <CreateProducts onProductsCreate={onProductsCreate}/> */}
        <CardBody>
          <div className={tableClasses.tableResponsive}>
            <Table>
              <TableHead className={tableClasses["primaryTableHeader"]}>
                <TableRow className={tableClasses.tableHeadRow}>
                  {[ 
                    { text: "ID", style: { width: "10%" } }, 
                    { text: "Name", style: {  } }, 
                    { text: "", style: { width: "20%" } }, 
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
                {state.products.length === 0 && <TableRow>
                  <TableCell colSpan={3} style={{ padding: "128px", textAlign: "center" }}>
                    No Any Product
                  </TableCell>                  
                </TableRow>}
                {state.products.map((product, i) => <TableRow key={i}>
                  <TableCell className={tableClasses.tableCell}>
                    {product.id}
                  </TableCell>
                  <TableCell className={tableClasses.tableCell}>
                    {state.currEditProductId === product.id 
                      ? <CustomInput 
                          labelText={undefined}
                          style={{ marginTop: "0px" }}
                          formControlProps={{
                            fullWidth: false
                          }}
                          inputProps={{
                            value: state.currEditProductTempName,
                            style: { margin: "0px" },
                            onChange: (e) => setState({ currEditProductTempName: e.target.value }),
                          }}
                        />
                      : <>{product.name}</>
                    }
                  </TableCell>
                  <TableCell className={tableClasses.tableCell}>
                    {state.currEditProductId === product.id 
                      ? <>
                        <IconButton
                          aria-label="Cancel"
                          onClick={() => onCancel()}
                        >
                          <Clear />
                        </IconButton>
                        <IconButton
                          aria-label="Save"
                          onClick={() => onProductsSave(product)}
                        >
                          <Check />
                        </IconButton>
                      </>
                      : <>
                        <IconButton
                          aria-label="Edit"
                          onClick={() => onProductsEdit(product)}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          color="secondary"
                          aria-label="Delete"
                          onClick={() => onProductsDelete(product)}
                        >
                          <Delete />
                        </IconButton>
                      </>
                      }
                  </TableCell>
                </TableRow>)}
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

export default Category;