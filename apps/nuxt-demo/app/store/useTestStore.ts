export const useTestStore = defineStore('testStore', {
  state: () => ({
    test: 'test',
  }),
  actions: {
    setTest(test: string) {
      this.test = test;
    },
  },
  getters: {
    getTest: (state) => state.test,
  },
});
