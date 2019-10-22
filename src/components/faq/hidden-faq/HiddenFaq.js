import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import "./hidden-faq.css";

const BootstrapButton = withStyles({
  root: {
    borderRadius: "20px",
    boxShadow: "none",
    textTransform: "none",
    fontSize: 16,
    padding: "6px 20px",
    lineHeight: 1.5,
    backgroundColor: "#009FE5",
    border: "none",
    fontFamily: [
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:hover": {
      backgroundColor: "#0B1A4C !important",
      boxShadow: "none !important"
    },
    "&:active": {
      boxShadow: "none !important",
      backgroundColor: "#0B1A4C !important"
    },
    "&:focus": {
      backgroundColor: "#0B1A4C !important",
      boxShadow: "none !important"
    }
  }
})(Button);

const useStyles = makeStyles(theme => ({
  margin: {
    margin: 0
  }
}));

const HiddenFaq = () => {
  const classes = useStyles();

  const renderHelpButton = () => {
    return (
      <BootstrapButton
        variant="contained"
        color="primary"
        disableRipple
        className={classes.margin}
      >
        <i className="fa fa-comment"></i>Help
      </BootstrapButton>
    );
  };
  return <div className="hidden-faq">{renderHelpButton()}</div>;
};

export default HiddenFaq;
