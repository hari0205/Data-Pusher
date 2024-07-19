import * as crypto from "crypto";

const generateSecretToken = (): string => {
  const buffer = crypto.randomBytes(64);
  return buffer.toString("hex");
};

export default generateSecretToken;
