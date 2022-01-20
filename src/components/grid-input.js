import * as math from "mathjs";
import styled from "styled-components";

export default function InputGrid({ matrix, onChange }) {
  return (
    <InputGridStyled>
      <table>
        <tbody>
          {matrix._data.map((row, rowIndex) => (
            <tr key={`row-${rowIndex}`}>
              {row.map((col, colIndex) => {
                return (
                  <td key={`col-${colIndex}`}>
                    <input
                      type="number"
                      value={col}
                      onChange={(v) => {
                        matrix.set(
                          [rowIndex, colIndex],
                          v.target.valueAsNumber
                        );
                        onChange(math.matrix(matrix._data));
                      }}
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </InputGridStyled>
  );
}

const InputGridStyled = styled.section`
  table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid black;

    td {
      border: 1px solid black;
    }

    input {
      padding: 5px;
      width: 100%;
      height: 100%;
      text-align: center;
      border: none;
      &:focus {
        outline: none;
      }
    }
  }
`;
