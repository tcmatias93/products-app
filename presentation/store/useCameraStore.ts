import { create } from "zustand";

interface TemporalCameraStoreState {
  //Porque pueden ser mas de una imagen
  selectedImage: string[];

  addSelectedImage: (image: string) => void;
  clearImage: () => void;
}

export const useCameraStore = create<TemporalCameraStoreState>()((set) => ({
  selectedImage: [],
  addSelectedImage: (image) => {
    set((state) => ({ selectedImage: [...state.selectedImage, image] }));
  },
  clearImage: () => set({ selectedImage: [] }),
}));
