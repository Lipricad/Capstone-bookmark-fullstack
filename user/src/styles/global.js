const global = {

  responsiveImage: {
    width: "12vw",
    height: "auto"
  },

  TypogBut: {
    color: "white",
    fontWeight: "bold"
  },

  TypogButCancel: {
    color: "black",
    fontWeight: "bold"
  },

  TypogTitle: {
    color: "#6633ff",
    fontWeight: "bold",
    textAlign: "center",
  },

  TypogTitle2: {
    color: "#282828",
    textAlign: "center",
    paddingTop: "20px"
  },

  TypogCollection: {
    color: "white",
    textAlign: "center",
    paddingTop: "8px",
    fontWeight: "bold"
  },

  buttonnav: {
    "&:hover": {
      transition: "0.4s",
      borderBottom: "solid",
      borderWidth: "5px",
      transform: "scale(1.1)"
    }
  },

  buttonBase: {
    border: "solid black",
    borderWidth: "2px",
    background: "#6633ff",
    padding: "15px",
    marginTop: "40px",
    borderRadius: "8px",
    filter: "brightness(90%)",
    "&:hover": {
      filter: "brightness(110%)",
      transition: "0.3s"
    }
  },

  buttonBasefp: {
    border: "solid black",
    borderWidth: "2px",
    background: "#6633ff",
    padding: "15px",
    width: "100%",
    marginTop: "2vh",
    borderRadius: "8px",
    filter: "brightness(90%)",
    "&:hover": {
      filter: "brightness(110%)",
      transition: "0.3s"
    }
  },

  buttonBookmark: {
    border: "solid",
    borderWidth: "2px",
    background: "#6633ff",
    padding: "15px",
    marginTop: "5px",
    borderRadius: "8px",
    marginLeft: "10px",
    filter: "brightness(90%)",
    "&:hover": {
      filter: "brightness(110%)",
      transition: "0.3s"
    }
  },

  buttonBaseCancel: {
    border: "solid",
    borderWidth: "1px",
    background: "white",
    padding: "15px",
    marginTop: "40px",
    borderRadius: "8px",
    filter: "brightness(100%)",
    "&:hover": {
      filter: "brightness(90%)",
      transition: "0.3s"
    }
  },

  ColectionButtonCol: {
    marginTop: "30px",
    marginBottom: "10px",
    borderBottom: "2px solid transparent",
    borderTop: "2px solid transparent",

    "&:hover": {
      borderBottom: "2px solid white",
      borderTop: "2px solid white",
      transform: "scale(1.02)",
      transition: "0.4s"
    }
  },

  ColectionBox: {
    display: "flex",
    flex: "1",
    alignItems: "center",
    borderBottom: "1px solid #45436d",
  },

  //OVERFLOW STYLES
  CollectionOverflowstyle: {
    display: "flex",
    flexDirection: "column",
    flex: "4",
    maxHeight: "60vh",
    textAlign: "center",
    overflow: "auto",
    borderTop: "2px solid #45436d",
    '&::-webkit-scrollbar': {
      width: '0.4em'
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      outline: '1px solid slategrey'
    }
  },

  //background: "#3b3b3b"  borderBottom: "2px solid #272727"  FOR DARKK MODE ETO GAWIN MO SA FUTURE 

  CategoryOverflowstyle: {
    flex: "15 1 auto",
    maxHeight: "95vh",
    // background: "#666666",
    background: "#FFFFFF",
    textAlign: "center",
    overflowX: "hidden",
    overflowY: "scroll",

    '&::-webkit-scrollbar': {
      width: '0.4em'
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(59,59,59,255)',
      outline: '1px solid slategrey'
    }
  },

  menuStyle: {
    "& .MuiPaper-root": {
      backgroundColor: "white",
      color: "black"
    }
  },


  /* SEARCH BAR STYLES */
  searchfield: {
    position: "static"
  },

  dataResult: {
    marginTop: "5px",
    width: "100%",
    height: "100vh",
    maxHeight: "100px",
    background: "white",
    boxShadow: "rgba(0,0,0,0.35) 0px 5px 15px",
    overflow: "hidden",
    overflowY: "auto",

    '&::-webkit-scrollbar': {
      display: "none"
    },
  },

  dataResultBlank: {
    marginTop: "5px",
    width: "100%",
    height: "100px",
  },

  dataItem: {
    textDecoration: "none",
    width: "100%",
    height: "50px",
    display: "flex",
    color: "black",
    cursor: "default"
  },

  dataItemTypog: {
    paddingLeft: "10px",
    textDecoration: "none",
    width: "100%",
    height: "50px",
    display: "flex",
    alignItems: "center",
    color: "black",

    "&:hover": {
      backgroundColor: "lightgrey"
    }
  }

}

export default global;