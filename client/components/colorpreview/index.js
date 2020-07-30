import "./styles.scss";

const ColorPreview = ({ value = "0,0,0", isSelected = false, onClick }) => {
  return (
    <div
      className="palette-preview"
      style={{
        backgroundColor: value ? `rgb(${value})` : "transparent",
        borderColor: isSelected ? "red" : "black",
      }}
      onClick={onClick}
    ></div>
  );
};

export default ColorPreview;
