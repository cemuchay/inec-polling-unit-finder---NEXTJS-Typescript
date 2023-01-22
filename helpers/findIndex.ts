const findIndex = (arr: Array<string | number>, param: string | number) => {
   const index = arr.findIndex((item) => item === param);
   return index;
};

export default findIndex;




