import styled from "styled-components";

export default function OutputValue({ title, matrix, className }) {
  return (
    <div>
      <h2>{title}</h2>
      <TableItem>
        <tbody>
          {matrix._data.map((row, rowIndex) => (
            <tr key={`row-${rowIndex}`}>
              {row.map((col, colIndex) => (
                <td key={`col-${colIndex}`}>{col}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </TableItem>
    </div>
  );
}

const TableItem = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid black;

  td {
    border: 1px solid black;

    text-align: center;
    padding: 10px;
  }
`;
