import { useState } from "react";

import ColorPicker from "../colorpicker";
import ColorPreview from "../colorpreview";
import "./styles.scss";

const PaletteForm = ({ array, setArray }) => {
  const [color, setColor] = useState("0,0,0");
  const [selected, setSelected] = useState(-1);

  return (
    <form>
      <div className="color-palette">
        {array.map((val, index) => (
          <ColorPreview
            key={"palette" + index}
            value={val}
            onClick={() => setSelected(index)}
            isSelected={selected === index}
          />
        ))}
      </div>
      <ColorPicker
        value={color}
        onChange={(val) => setColor(val)}
        onSubmit={(val) => {
          if (selected >= 0) {
            const arr = array.slice();
            arr[selected] = val;
            setArray(arr);
          }
        }}
      />
    </form>
  );
};

export default PaletteForm;
