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

  TypogCollectionName: {
    color: "white",
    fontWeight: "bold",
    maxWidth: "160px"
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
    // flex: "4",
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
    flex: "15",
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

  takeOff: {
    height: "80%",
    minHeight: "60vh",
    background: 'url(pictures/Logo/bookmark_take_off.png)',
    backgroundSize: "50%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    filter: "drop-shadow(0 0 0.50rem #45436d)"
  },

  menuStyle: {
    "& .MuiPaper-root": {
      backgroundColor: "white",
      color: "black"
    }
  },


  /* COLLECTION BOX STYLES */
  NewCollectionButton: {
    border: "3px solid #6633ff",
    padding: "10px",
    marginTop: "30px",
    marginBottom: "30px", "&:hover": {
      background: "#45436d",
      transition: "0.3s"
    }
  },

  MNewCollectionButton: {
    border: "3px solid #8984D6",
    padding: "10px",
  },


  /* CATEGORY BOX STYLES */
  CategoryBoxStyle: {
    display: "flex",
  },

  CategoryTitle: {
    color: "#6633ff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: "4.5vw",
  },

  /* BOOKMARK BOX STYLES */
  BookmarkBoxStyle: {
    display: "flex",
    flexDirection: "column",
  },

  BookmarkBoxStylesearch: {
    display: "flex",
    flex: "1",
    marginTop: "30px",
    justifyContent: "center",
  },

  BookmarkBoxStylerow: {
    display: "flex",
    flexDirection: "row",
    flex: "1",
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
  },

  //HOWTO STYLES
  HowtoBoxMain: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    background: "#FFFFFFF",
    marginTop: "78px",
    width: "100%"
  },

  HowtoBoxes: {
    display: "flex",
    flex: "1",
    flexDirection: "column",
    alignItems: "center",
    margin: "3vw",
    background: "#f0f2f5",
    padding: "20px",
    filter: "drop-shadow(0 0 0.25rem #45436d)"
  },

  HowtoTypogs: {
    textAlign: "center",
    background: "#7251b2",
    flex: "1 1 auto",
    color: "white",
    marginBottom: "12px",
    width: "100%"
  },



  //ADMINBOX STYLES

  adminBoxStylesMain: {
    display: "flex",
    flexDirection: "row",
    minHeight: "100vh",
    backgroundColor: "yellow"
  },

  adminBoxStylesPanel: {
    flex: "1",
    background: "red",
    display: "flex",
    flexDirection: "column",
    marginTop: "78px",
    maxWidth: "250px",
    minWidth: " 250px",
  },

  adminBoxStylesBody: {
    flex: "10",
    display: "flex",
    flexDirection: "column",
    background: "purple"
  },

  adminBoxStyleTitle: {
    flex: "1",
    marginTop: "78px",
    background: "green",
    minHeight: "100px"
  },

  adminBoxStyleList: {
    flex: "5",
    display: "flex",
    flexDirection: "row",
    background: "pink"
  },

  adminBoxStylesTable: {
    flex: "4",
    background: "white",
  },

  adminBoxStylesCreate: {
    flex: "1",
    background: "blue",
  },

  adminTableTitle: {
    fontWeight: "bold",
    maxWidth: "300px"
  },

  adminTableTypog: {
    maxWidth: "250px"
  },

  adminConfirmTypog: {
    color: "white"
  },

  editMarginAdmin: {
    margin: "15px"
  },

}

export default global;