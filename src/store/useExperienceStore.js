import { create } from "zustand";

export const useExperienceStore = create((set) => ({
  isExperienceReady: false,
  isSceneReady: false,
  isInfoPanelOpen: false,
  setIsExperienceReady: (bool) => set({ isExperienceReady: bool }),
  setIsSceneReady: (bool) => set({ isSceneReady: bool }),
  setIsInfoPanelOpen: (bool) => set({ isInfoPanelOpen: bool }),
}));
