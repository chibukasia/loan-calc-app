import FormInput from "@/components/Fields/FormInput";
import FormSelect from "@/components/Fields/FormSelect";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import { Button } from "react-native-paper";

const LoanCalculationForm = () => {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    
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
        items={[{ label: "Monthly", value: "monthly" }, {label: 'Annually', value: 'annually'}]}
      />
      <FormSelect
        control={control}
        name="pay_back"
        label="Pay Back"
        required
        items={[{ label: "Every Month", value: "monthly" }, { label: "Every Year", value: "yearly" }]}
      />
      <View style={{ alignItems: "center", paddingTop: 20 }}>
        <Button
          style={{ width: 200 }}
          mode="contained"
          onPress={handleSubmit(onSubmit)}
        >
          Calculate
        </Button>
      </View>
    </View>
  );
};

export default LoanCalculationForm;
