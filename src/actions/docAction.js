const curentDoc = doc => {
  console.log("trenutno je doctor" + doc);
  return {
    type: "CURENTDOC",
    payload: doc
  };
};

export default curentDoc;
