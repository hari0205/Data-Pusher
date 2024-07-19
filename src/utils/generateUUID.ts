import { v4 as uuid } from "uuid";

const generateUUID = () => {
  const unique = uuid();
  return unique;
};

export default generateUUID;
