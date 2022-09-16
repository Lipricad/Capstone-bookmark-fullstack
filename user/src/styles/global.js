const global = {

  responsiveImage: {
    width: "12vw",
    height: "auto"
  },

  TypogBut: {
    color: "white",
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

  menuStyle: {
    "& .MuiPaper-root": {
      backgroundColor: "#6633ff",
      color: "white"
    }
  }

}

export default global;