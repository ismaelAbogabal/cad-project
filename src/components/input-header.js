import { TextField } from "@mui/material";
import { isPositive, number } from "mathjs";
import styled from "styled-components";

export default function InputHeader({ value, onChange }) {
  const [x, y] = value;
  return (
    <InputHeaderStyled>
      <Header>
        <h1>INPUT</h1>
        <h4>Matrix</h4>
      </Header>
      <div className="sizer">
        <TextField
          inputMode="numeric"
          label="x"
          variant="standard"
          type="number"
          value={x}
          sx={{ width: 60 }}
          onChange={(event) => {
            const val = event.target.valueAsNumber;

            if (!val || isNaN(val) || !isPositive(val) || val <= y) return;
            onChange([val, y]);
          }}
        />
        <TextField
          label="y"
          variant="standard"
          type="number"
          sx={{ width: 60 }}
          value={y}
          onChange={(event) => {
            const val = event.target.valueAsNumber;
            if (!val || isNaN(val) || !isPositive(val)) return;
            onChange([x, val]);
          }}
        />
      </div>
    </InputHeaderStyled>
  );
}

const InputHeaderStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .sizer {
    display: flex;
    gap: 5px;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: baseline;
  gap: 5px;

  h1 {
    text-transform: uppercase;
  }

  h4 {
    color: #777;
  }
`;
