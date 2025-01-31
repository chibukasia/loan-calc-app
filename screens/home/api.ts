import client from "../../lib/axios";
import { FData } from "./forms/LoanCalculationForm";

export const calculateLoan = async (data: FData) => {
  const response = await client.post("loans/calculate-loan/", data);
  return response.data;
};

export const getUserSession = async () => {
  const response = await client.get('users/me/');
  return response.data
};
