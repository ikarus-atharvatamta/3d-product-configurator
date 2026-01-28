import { create } from "zustand";

export const useConfiguratorStore = create((set) => ({
  productId: "565-01",
  woodFinish: "Amber.png",
  handleNumber: 1,
  legsFinish: "Amber.png",
  legsNumber: "A",
  handleFinish: "Antique English.jpg",
  showMeasurements: false,
  gl: null,
  scene: null,
  camera: null,
  exportModel: false,
  arModelurl: null,
  focusedPoint : null,
  setFocusedPoint : (pos)=>set({focusedPoint :pos}),
  clearFocusedPoint : ()=> set({focusedPoint: null}),
  setProductId: (id) =>
    set({
      productId: id, //resetting dependent state in setProductid
      woodFinish: "Amber.png",
      handleNumber: 1,
      legsNumber: "A",
      legsFinish: "Amber.png",
      handleFinish: "Antique English.jpg",
      showMeasurements: false,
    }),
  setWoodFinish: (finish) => set({ woodFinish: finish }),
  setHandleNumber: (num) => set({ handleNumber: num }),
  setLegsNumber: (type) => set({ legsNumber: type }),
  setHandleFinish: (finish) => set({ handleFinish: finish }),
  setLegsFinish: (finish) => set({ legsFinish: finish }),
  toggleMeasurements: () =>
    set((state) => ({ showMeasurements: !state.showMeasurements })),
  setThreeState: (gl, scene, camera) => set({ gl, scene, camera }),
  triggerExport: () => set({ exportModel: true,arModelurl:null }),
  //export the model
  resetExport: () => set({ exportModel: false }),
  setArModelurl :(url) => set({arModelurl:url}),
  clearArModelurl : ()=> set({arModelurl:null })
}));
