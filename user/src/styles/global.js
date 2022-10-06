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
    paddingTop: "120px"
  },

  TypogTitle2: {
    color: "#282828",
    textAlign: "center",
    paddingTop: "20px"
  },

  TypogCollection: {
    color: "#Afa9a9",
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
    border: "solid",
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
    marginBottom: "60px",
    borderBottom: "2px solid transparent",
    borderTop: "2px solid transparent",

    "&:hover": {
      borderBottom: "2px solid white",
      borderTop: "2px solid white",
      transform: "scale(1.02)",
      transition: "0.4s"
    }
  },

  //OVERFLOW STYLES
  CollectionOverflowstyle: {
    maxHeight: "60vh",
    textAlign: "center",
    overflow: "auto",
    borderTop: "3px solid #272727",
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

  CategoryOverflowstyle: {
    flex: "15 1 auto",
    maxHeight: "95vh",
    background: "#666666",
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
      backgroundColor: "#6633ff",
      color: "white"
    }
  }

}

export default global;