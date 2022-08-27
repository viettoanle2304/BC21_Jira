export const USER = "user";

export const localStoreService = {
  setUserLocal: (data) => {
    const dataJSON = JSON.stringify(data);
    localStorage.setItem(USER, dataJSON);
  },

  getUserLocal: () => {
    const dataJSON = localStorage.getItem(USER);
    if (dataJSON) return JSON.parse(dataJSON);
    return null;
  },

  removeUserLocal: () => {
    const dataJSON = localStorage.getItem(USER);
    if (dataJSON) {
      localStorage.removeItem(USER);
    }
  },
};
