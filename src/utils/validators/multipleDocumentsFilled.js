import { isNull } from "util";

const multipleDocumentsFilled = (filesArray, size) =>
  !(filesArray.length >= size && !filesArray.slice(0, size).some(isNull));

  export default multipleDocumentsFilled;