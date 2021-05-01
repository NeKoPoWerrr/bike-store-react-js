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
import CreateCategory from './CreateCategory.js'
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

const Category = () => {
  const classes = useStyles();
  const tableClasses = useTableStyles();
  const [state, setState] = useCustomState({
    categories: [],
    currEditCategoryId: undefined,
    currEditCategoryTempName: undefined,
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
      const result = ObjectUtils.convertToCamelNaming(res.result);
      const categories = result.data || [];
      const pageInfo = result.pageInfo;

      setState({
        categories, pageInfo,
      });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadPage();
  }, [ state.pageInfo.page, state.pageInfo.size ]);

  const onCategorysEdit = (category) => {
    setState({ 
      currEditCategoryId: category.id,
      currEditCategoryTempName: category.name,
    });
  }

  const onCategorysSave = async(category) => {
    try {
      const payload = { name: state.currEditCategoryTempName };
      const res = await Api.apiUpdateCategory(category.id, payload);
      if (res.code === SUCCESS_CODE) {
        const { categories } = state;
        categories.filter((c) => c.id === category.id)[0].name = state.currEditCategoryTempName;
        setState({
          categories,
          currEditCategoryId: undefined,
          currEditCategoryTempName: undefined,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  const onCategorysCreate = async(categoryName) =>{
    const inputName = {name : categoryName};
      try {
        const res = await Api.apiCreateCategory(inputName);
          if (res.code === SUCCESS_CODE) {
            loadPage();
          }
      } catch (error) {
        console.error(error);
      }
  }

  const onCategorysDelete = async(category) => {
    try {
      const res = await Api.apiDeleteCategory(category.id);
      if (res.code === SUCCESS_CODE) {
        loadPage();
      }
    } catch (error) {
      console.error(error);
    }
  }

  const onCancel = () => {
    setState({
      currEditCategoryId: undefined,
      currEditCategoryTempName: undefined,
    });
  }

  const handlePageChange = (event, value) => {
    const pageInfo = state.pageInfo;
    pageInfo.page = value - 1;
    setState({ 
      pageInfo,
      currEditCategoryId: undefined,
      currEditCategoryTempName: undefined, 
    });
  }
;
  
  

  return (
    <div>
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>Categories</h4>
          <p className={classes.cardCategoryWhite}>
            Maintain brands of category
          </p>
        </CardHeader>
        <CreateCategory onCategorysCreate={onCategorysCreate}/>
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
                {state.categories.length === 0 && <TableRow>
                  <TableCell colSpan={3} style={{ padding: "128px", textAlign: "center" }}>
                    No Any Category
                  </TableCell>                  
                </TableRow>}
                {state.categories.map((category, i) => <TableRow key={i}>
                  <TableCell className={tableClasses.tableCell}>
                    {category.id}
                  </TableCell>
                  <TableCell className={tableClasses.tableCell}>
                    {state.currEditCategoryId === category.id 
                      ? <CustomInput 
                          labelText={undefined}
                          style={{ marginTop: "0px" }}
                          formControlProps={{
                            fullWidth: false
                          }}
                          inputProps={{
                            value: state.currEditCategoryTempName,
                            style: { margin: "0px" },
                            onChange: (e) => setState({ currEditCategoryTempName: e.target.value }),
                          }}
                        />
                      : <>{category.name}</>
                    }
                  </TableCell>
                  <TableCell className={tableClasses.tableCell}>
                    {state.currEditCategoryId === category.id 
                      ? <>
                      <Tooltip title="取消" placement="bottom" arrow>
                        <IconButton
                          color="secondary"
                          aria-label="Cancel"
                          onClick={() => onCancel()}
                        >
                          <Clear />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="確定" placement="bottom" arrow>
                        <IconButton
                          style={{color:"green"}}
                          aria-label="Save"
                          onClick={() => onCategorysSave(category)}
                        >
                          <Check />
                        </IconButton>
                      </Tooltip>
                      </>
                      : <>
                      <Tooltip title="編輯" placement="bottom" arrow>
                        <IconButton
                          color="primary"
                          aria-label="Edit"
                          onClick={() => onCategorysEdit(category)}
                        >
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="刪除" placement="bottom" arrow>
                        <IconButton
                          color="secondary"
                          aria-label="Delete"
                          onClick={() => onCategorysDelete(category)}
                        >
                          <Delete />
                        </IconButton>
                      </Tooltip>  
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