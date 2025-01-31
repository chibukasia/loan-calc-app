import { Loan } from "@/screens/types";
import dayjs from "dayjs";
import { DataTable } from "react-native-paper";

const ResultsTable = ({ data }: { data: Loan }) => {
  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Payment Date</DataTable.Title>
        <DataTable.Title>Principal Paid</DataTable.Title>
        <DataTable.Title>Interest Paid</DataTable.Title>
        <DataTable.Title>Balance</DataTable.Title>
      </DataTable.Header>
      {data.amortizationSchedules.map((item) => (
        <DataTable.Row key={item.id}>
          <DataTable.Cell>{dayjs(item.paymentDate).format('DD-MM-YYYY')}</DataTable.Cell>
          <DataTable.Cell>{item.principalPaid}</DataTable.Cell>
          <DataTable.Cell>{item.interestPaid}</DataTable.Cell>
          <DataTable.Cell>{item.balance}</DataTable.Cell>
        </DataTable.Row>
      ))}
    </DataTable>
  );
};

export default ResultsTable;
