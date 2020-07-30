import { useState, useEffect } from "react";

import "./styles.scss";

const ColorPicker = ({ value = "0,0,0", onChange, onSubmit }) => {
  const [r, setR] = useState(0);
  const [g, setG] = useState(0);
  const [b, setB] = useState(0);

  useEffect(() => {
    const val = value.split(",");

    setR(parseInt(val[0], 10));
    setG(parseInt(val[1], 10));
    setB(parseInt(val[2], 10));
  }, [value]);

  const dec2Hex = (rr, gg, bb) => {
    return [rr, gg, bb].join(",");
  };

  return (
    <div className="color-picker">
      <div className="picker-input-group">
        <span>R</span>
        <span>G</span>
        <span>B</span>
      </div>
      <div className="picker-input-group">
        <input
          type="number"
          min={0}
          max={255}
          value={r}
          onChange={(e) => {
            setR(e.target.value);
            onChange(dec2Hex(e.target.value, g, b));
          }}
        />
        <input
          type="number"
          min={0}
          max={255}
          value={g}
          onChange={(e) => {
            setG(e.target.value);
            onChange(dec2Hex(r, e.target.value, b));
          }}
        />
        <input
          type="number"
          min={0}
          max={255}
          value={b}
          onChange={(e) => {
            setB(e.target.value);
            onChange(dec2Hex(r, g, e.target.value));
          }}
        />
      </div>
      <div
        className="picker-preview"
        style={{ backgroundColor: `rgb(${value})` }}
      ></div>
      <button type="button" onClick={() => onSubmit(dec2Hex(r, g, b))}>
        Apply
      </button>
    </div>
  );
};

export default ColorPicker;
