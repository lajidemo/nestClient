interface ILocalStorFn {
  type: 'get' | 'set' | 'remove';
  key: string;
  value?: any;
}
export function localStorFn(type: 'get' | 'set' | 'remove', key: string, value?: any) {
  const obj = {
    get() {
      return localStorage.getItem(key) || '';
    },
    set() {
      return localStorage.setItem(key, value);
    },
    remove() {
      localStorage.removeItem(key);
    },
  };
  return obj[type]();
}
