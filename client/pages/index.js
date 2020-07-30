import { useState } from "react";
import axios from "axios";

import { SERVER_URL } from "../constants";

import Welcome from "../components/welcome";
import PaletteForm from "../components/paletteform";
import ColorPreview from "../components/colorpreview";
import "./styles.scss";

const Home = ({ orginalPalettes }) => {
  const [array, setArray] = useState(new Array(5).fill(null));
  const [palettes, setPalettes] = useState(orginalPalettes);
  const [selected, setSelected] = useState(-1);

  const onRemove = async () => {
    if (selected === -1) {
      alert("Nothing selected");
    } else {
      await axios.delete(`${SERVER_URL}/palettes/${palettes[selected].id}`);
      const res = await axios.get(`${SERVER_URL}/palettes`);
      setPalettes(res.data);
      setSelected(-1);
    }
  };

  const onUpdate = async () => {
    await axios.put(`${SERVER_URL}/palettes/${palettes[selected].id}`, {
      color0: array[0],
      color1: array[1],
      color2: array[2],
      color3: array[3],
      color4: array[4],
    });
    const res = await axios.get(`${SERVER_URL}/palettes`);
    setPalettes(res.data);
  };

  const onCreate = async () => {
    await axios.post(`${SERVER_URL}/palettes`, {
      color0: array[0],
      color1: array[1],
      color2: array[2],
      color3: array[3],
      color4: array[4],
    });
    setArray(new Array(5).fill(null));
    const res = await axios.get(`${SERVER_URL}/palettes`);
    setPalettes(res.data);
  };

  return (
    <div className="main">
      <div className="gallery">
        <Welcome />
        <div className="container">
          {palettes.map((palette, index) => (
            <div
              key={"palette" + index}
              onClick={() => {
                setSelected(index);
                setArray([
                  palettes[index].color0,
                  palettes[index].color1,
                  palettes[index].color2,
                  palettes[index].color3,
                  palettes[index].color4,
                ]);
              }}
              style={{
                borderRadius: "4px",
                borderWidth: selected === index ? 2 : 1,
                borderStyle: "solid",
                paddingTop: "4px",
                marginBottom: "4px",
                borderColor: selected === index ? "red" : "black",
              }}
            >
              <h6 style={{ textAlign: "center" }}>Pallete - {palette.id}</h6>
              <div className="color-palette">
                <ColorPreview value={palette.color0} />
                <ColorPreview value={palette.color1} />
                <ColorPreview value={palette.color2} />
                <ColorPreview value={palette.color3} />
                <ColorPreview value={palette.color4} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="controls">
        <button onClick={onCreate}>Create Palette</button>
        <button onClick={onRemove}>Remove Palette</button>
        <button onClick={onUpdate}>Update Palette</button>
        <PaletteForm array={array} setArray={setArray} />
      </div>
    </div>
  );
};

Home.getInitialProps = async (ctx) => {
  const { status, data } = await axios.get(`${SERVER_URL}/palettes`);
  if (status === 200) {
    return { orginalPalettes: data };
  } else {
    return { orginalPalettes: [] };
  }
};

export default Home;
