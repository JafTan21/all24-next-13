import Td from "../../../../../components/Html/Td";

export default function TableHeader() {
  return (
    <tr>
      <th className="p-4">#</th>
      <Td>Requested by</Td>
      <Td>Amount</Td>
      <Td>Super id</Td>
      <Td>Date</Td>
      <Td>Status</Td>
      <Td>Actions</Td>
    </tr>
  );
}
