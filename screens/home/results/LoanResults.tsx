import { View } from "react-native";
import { Text } from "react-native-paper";
import { Loan } from "../../types";

interface IProps {
  data: Loan;
}
const LoanResults = ({ data }: IProps) => {
  return (
    <View style={{gap: 10}}>
      <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 22}}>Loan Results</Text>
      <View style={{gap: 10}}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ width: "48%" }}>
            <Text>Initial Amount</Text>
          </View>
          <View style={{ width: "48%" }}>
            <Text>KSH {data.principalAmount}</Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ width: "48%" }}>
            <Text>Payment Every {data.repaymentFrequency === "ANNUAL"? "Year": "Month"}</Text>
          </View>
          <View style={{ width: "48%" }}>
            <Text>KSH {data.monthlyPayment}</Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ width: "48%" }}>
            <Text>Total Interest</Text>
          </View>
          <View style={{ width: "48%" }}>
            <Text>KSH {(data.totalToBePaid - data.principalAmount).toFixed(2)}</Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ width: "48%" }}>
            <Text>Total of {data.amortizationSchedules.length} payments</Text>
          </View>
          <View style={{ width: "48%" }}>
            <Text>KSH {data.totalToBePaid.toFixed(2)}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default LoanResults;
