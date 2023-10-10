import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const DarkModeToggle = () => {
  const { mode, toggle } = useContext(ThemeContext);
  return (
    <div className="container" onClick={toggle}>
      <div className="icon">🌙</div>
      <div className="icon">🔆</div>
      <div
        className="ball"
        style={mode === "light" ? { left: "2px" } : { right: "2px" }}
      />
    </div>
  );
};

export default DarkModeToggle;
