import { useExperienceStore } from "../../../store/useExperienceStore";
import "./InfoButton.css";

const InfoButton = () => {
  const isInfoPanelOpen = useExperienceStore((state) => state.isInfoPanelOpen);
  const setIsInfoPanelOpen = useExperienceStore(
    (state) => state.setIsInfoPanelOpen,
  );

  return (
    <button
      id="info-button"
      onClick={() => setIsInfoPanelOpen(!isInfoPanelOpen)}
    >
      {isInfoPanelOpen ? "关闭" : "信息"}
    </button>
  );
};

export default InfoButton;
