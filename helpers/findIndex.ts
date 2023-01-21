const findIndex = (arr: Array<any>, param: string) => {
   const index = arr.findIndex((item) => item === param);
   return index;
};

export default findIndex;
