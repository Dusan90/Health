const trackHistory = (history) => {
    return {
      type: "HISTORY",
      payload: history,
    };
  };
  
  export default trackHistory;