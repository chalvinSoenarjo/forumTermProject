 import * as db from "../fake-db";

export const getUserByUsername = async (uname: string) => {
  return db.getUserByUsername(uname);
};

export const validateUser = async (uname: string, password: string) => {
  return db.validateUser(uname, password);
};
