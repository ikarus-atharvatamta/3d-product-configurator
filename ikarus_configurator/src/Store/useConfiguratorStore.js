import { create } from "zustand";

export const useConfiguratorStore = create((set) => ({
  productId: "565-01",
  woodFinish: "Amber.png",
  handleNumber: 1,
  legsFinish : "Amber.png",
  legsNumber: "A",
  handleFinish : "Antique English.jpg",
  setProductId: (id) =>
    set({
      productId: id, //resetting dependent state in setProductid
      woodFinish: "Amber.png",
      handleNumber: 1,
      legsNumber: "A",
      legsFinish : "Amber.png",
      handleFinish : "Antique English.jpg"
    }),
     setLegsFinish: (finish) => set({ legsFinish: finish }),
  setWoodFinish: (finish) => set({ woodFinish: finish }),
  setHandleNumber: (num) => set({ handleNumber: num }),
  setLegsNumber : (type) => set({legsNumber : type}),
  setHandleFinish : (finish) => set({handleFinish :finish})
}));
