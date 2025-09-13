export class Storage {
   // LOCAL STORAGE
  static set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static get(key: any) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  static reset() {
    localStorage.clear()
  }
} 