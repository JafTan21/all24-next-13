import Td from "../../../../../components/Html/Td";

export default function TableHeader() {
  return (
    <tr>
      <th className="p-4">#</th>
      <Td>Requested By</Td>
      <Td>Amount</Td>
      <Td>From</Td>
      <Td>To</Td>
      <Td>Account Type</Td>
      <Td>Transaction Number</Td>
      <Td>Date</Td>
      <Td>Status</Td>
      <Td>Action</Td>
    </tr>
  );
}
