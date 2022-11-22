class UserStorage {
  set(key: string, value: any) {
    const d = new Date();
    d.setTime(d.getTime() + 30 * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie =
      key + "=" + JSON.stringify(value) + ";" + expires + ";path=/";

    // localStorage.setItem(key, JSON.stringify(value));
  }

  get(key: string, fallback: string | undefined = "") {
    // const value = localStorage.getItem(key);
    // if (!value) return fallback;
    // return JSON.parse(value);
  }
}

export default new UserStorage();
