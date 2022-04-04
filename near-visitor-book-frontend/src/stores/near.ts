/* eslint-disable @typescript-eslint/ban-ts-comment */
import { defineStore } from "pinia";
//@ts-ignore

export const useNearStore = defineStore({
  id: "near",
  state: () => ({
    near: null as any,
  }),
  getters: {
    near: (state) => state.near,
    contract: (state) => state.near.contract,
    currentUser: (state) => state.near.currentUser,
    nearConfig: (state) => state.near.nearConfig,
    wallet: (state) => state.near.wallet,
  },
  actions: {},
});
