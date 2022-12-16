import Td from "../../../../../components/Html/Td";

export default function TableHeader() {
  return (
    <tr>
      <th className="p-4">#</th>
      <Td>Sent from</Td>
      <Td>Sent To</Td>
      <Td>Amount</Td>
      <Td>Date</Td>
      <Td>Status</Td>
      <Td>Actions</Td>
    </tr>
  );
}
