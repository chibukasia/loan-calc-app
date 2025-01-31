import FormInput from "@/components/Fields/FormInput";
import FormSelect from "@/components/Fields/FormSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { loanSchema } from "./schema";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { calculateLoan } from "../api";
import { Loan } from "@/screens/types";

type TData = z.infer<typeof loanSchema>;

export interface FData {
  amount: number;
  years: string;
  months: string;
  compound: string;
  interest_rate: number;
  pay_back: string;
}

interface IProps {
    setLoanResults: (loanResults: Loan) => void
}
const LoanCalculationForm = ({setLoanResults}: IProps) => {
  const { control, handleSubmit } = useForm<TData>({
    resolver: zodResolver(loanSchema),
    defaultValues: {
      years: "0",
      months: "0",
      compound: "monthly",
      pay_back: "monthly",
    },
  });

  const queryClient = useQueryClient();
  const { mutate, isPending, data } = useMutation({
    mutationKey: ["loan"],
    mutationFn: (data: FData) => calculateLoan(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["loan"] });
      setLoanResults(data.loan)
    },
    onError(error, variables, context) {
      console.log(error);
    },
  });
  const onSubmit = (data: z.infer<typeof loanSchema>) => {
    console.log(data);
    mutate({
      ...data,
      amount: parseInt(data.amount, 10),
      interest_rate: parseInt(data.interest_rate, 10),
    });
  };

  return (
    <View style={{ gap: 10 }}>
      <FormInput
        control={control}
        name="amount"
        label="Loan Amount"
        required
        type="numeric"
      />
      <View style={{ display: "flex", flexDirection: "row", gap: 20 }}>
        <FormInput
          control={control}
          name="years"
          label="Loan Term Years"
          required
          type="numeric"
        />
        <FormInput
          control={control}
          name="months"
          label="Loan Term Months"
          required
          type="numeric"
        />
      </View>
      <FormInput
        control={control}
        name="interest_rate"
        label="Interest Rate"
        required
        type="numeric"
      />
      <FormSelect
        control={control}
        name="compound"
        label="Compound"
        required
        items={[
          { label: "Monthly", value: "monthly" },
          { label: "Annually", value: "annually" },
        ]}
      />
      <FormSelect
        control={control}
        name="pay_back"
        label="Pay Back"
        required
        items={[
          { label: "Every Month", value: "monthly" },
          { label: "Every Year", value: "yearly" },
        ]}
      />
      <View style={{ alignItems: "center", paddingTop: 20 }}>
        <Button
          style={{ width: 200 }}
          mode="contained"
          loading={isPending}
          onPress={handleSubmit(onSubmit)}
        >
          {isPending ? "Calculating..." : "Calculate"}
        </Button>
      </View>
    </View>
  );
};

export default LoanCalculationForm;
