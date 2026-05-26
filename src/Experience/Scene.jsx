import React, { Suspense, useEffect } from "react";

import MovingCharacters from "./models/Moving_Characters";
import Winter from "./models/Scene_1_Winter";
import Spring from "./models/Scene_2_Spring";
import Summer from "./models/Scene_3_Summer";
import Fall from "./models/Scene_4_Fall";
import CustomCamera from "./components/CustomCamera";
import { useExperienceStore } from "../store/useExperienceStore";

const SceneReadySentinel = () => {
  const setIsSceneReady = useExperienceStore((state) => state.setIsSceneReady);
  useEffect(() => {
    setIsSceneReady(true);
  }, []);
  return null;
};

const Scene = () => {
  return (
    <>
      <CustomCamera />
      <Suspense fallback={null}>
        <MovingCharacters />
        <Winter />
        <Spring />
        <Summer />
        <Fall />
        <SceneReadySentinel />
      </Suspense>
    </>
  );
};

export default Scene;
