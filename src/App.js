import * as math from "mathjs";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import OutputValue from "./components/gid-output";
import InputGrid from "./components/grid-input";
import InputHeader, { Header } from "./components/input-header";

function App() {
  const [[x, y], setSize] = useState([5, 3]);
  const [at, setAt] = useState(math.zeros(y, y));
  const [al, setAl] = useState(math.zeros(y, x - y));

  const [cutSet, setCutSet] = useState();
  var [tieSet, setTieSet] = useState();

  useEffect(() => {
    setAt((a) => a.clone().resize([y, y]));
    setAl((a) => a.clone().resize([y, x - y]));
  }, [x, y]);

  useEffect(() => {
    // calc tie set

    try {
      setCutSet(null);
      setTieSet(null);
      let ati = math.inv(at);

      let cl = math.multiply(ati, al);
      setCutSet(math.concat(math.identity(y), cl));

      let bt = math.multiply(math.transpose(cl), -1);
      setTieSet(math.concat(bt, math.identity(y)));

      // calc cut set
    } catch (error) {
      console.log(error);
    }
    // cutSet = a.inv;
  }, [at, al, x, y]);

  return (
    <>
      <HomeBackground src="/image-hero-desktop.jpg" alt="Background image" />
      <Content>
        <div className="card">
          <InputHeader
            value={[x, y]}
            onChange={(size) => {
              setSize(size);
            }}
          />
          <table>
            <thead>
              <tr>
                <th>AT</th>
                <th>AL</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <InputGrid
                    matrix={at}
                    onChange={(m) => {
                      setAt(m);
                    }}
                  />
                </td>
                <td>
                  <InputGrid
                    matrix={al}
                    onChange={(m) => {
                      setAl(m);
                    }}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="card">
          <Header>
            <h1>Output</h1>
            <h4>values</h4>
          </Header>
          {tieSet && <OutputValue matrix={tieSet} title="Tie set" />}

          {cutSet && <OutputValue matrix={cutSet} title="Cut set" />}
        </div>
      </Content>
    </>
  );
}

const Content = styled.section`
  position: relative;
  padding-top: 20vw;

  margin: auto;
  padding-bottom: 30px;
  width: calc(100% - 20px);

  max-width: 700pt;

  .card {
    padding: 30px;
    margin-bottom: 20px;

    background-color: white;
    border-radius: 15px;
    box-shadow: 0 0 5px #0004;
  }
`;

const HomeBackground = styled.img`
  width: 100%;
  aspect-ratio: 3.5;

  position: fixed;
`;

export default App;
