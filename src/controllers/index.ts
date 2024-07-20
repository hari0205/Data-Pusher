import * as AccountsController from "./accountsController";
import * as DestinationsController from "./destinationsController";
import * as DataHandleController from "./dataHandleController";

export const {
  createAccount,
  getAllAccounts,
  getAccount,
  updateAccount,
  deleteAccount,
} = AccountsController;

export const {
  createDestination,
  getAllDestinations,
  updateDestination,
  deleteDestination,
} = DestinationsController;

export const { handleData } = DataHandleController;
