import React from "react";
import "./InfoPanel.css";
import { useCurveProgressStore } from "../../store/useCurveProgressStore";

const progressMoveRanges = {
  winter: { start: 0, end: 0.235 },
  spring: { start: 0.235, end: 0.49 },
  summer: { start: 0.49, end: 0.74 },
  fall: { start: 0.74, end: 1 },
};

const seasonImages = {
  winter: "/images/blue.webp",
  spring: "/images/green.webp",
  summer: "/images/orange.webp",
  fall: "/images/red.webp",
};

const getSeason = (scrollProgress) => {
  for (const [season, range] of Object.entries(progressMoveRanges)) {
    if (scrollProgress >= range.start && scrollProgress <= range.end) {
      return season;
    }
  }
  return "winter";
};

const InfoPanel = () => {
  const scrollProgress = useCurveProgressStore((state) => state.scrollProgress);
  const season = getSeason(scrollProgress);

  return (
    <div
      className="info-panel"
      style={{ backgroundImage: `url(${seasonImages[season]})` }}
    >
      <div className="info-box">
        <div className="info-box-content">
          <div className="info-box-title">致谢：</div>

          <p className="info-intro">
            本网站是为 Codrops 文章和{" "}
            <a
              href="https://www.youtube.com/watch?v=AD01pTr3gvw&feature=youtu.be"
              target="_blank"
              rel="noreferrer"
            >
              YouTube 教程
            </a>
            制作的！为保护隐私，姓名和细节已匿名化。在{" "}
            <a
              href="https://github.com/andrewwoan/aimee-weis-papercraft-world"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            上查看完整的致谢列表、代码和 Blender 文件！如有任何问题或只是想打个招呼，欢迎联系我！
          </p>

          <ul className="info-list">
            {/* <li>
              UI Design inspired by
              <a
                href="https://github.com/wehwayne2/lucys-bedroom-interface"
                target="_blank"
                rel="noreferrer"
              >
                Xianyao Wei
              </a>
              .
            </li>
            <li>
              3D curve system inspired by{" "}
              <a href="https://github.com" target="_blank" rel="noreferrer">
                this open source repo
              </a>
              .
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InfoPanel;
