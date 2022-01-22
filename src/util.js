const util = {
  // 是否是手机
  isMobile() {
    if (navigator.userAgent.indexOf('iPhone') > 0) return true;
    if (navigator.userAgent.indexOf('Android') > 0) return true;
    return false;
  },

  // Token是否有效
  isToken(token) {
    if (token) {
      const jwt = token.split('.');
      if (jwt.length === 3) {
        const { exp } = JSON.parse(window.atob(jwt[1]));
        if (exp > new Date().getTime() / 1000) return true;
      }
    }
    return false;
  },

  // 是否为数字
  isNumber(obj) {
    const reg = /^[0-9]+.?[0-9]*$/;
    if (reg.test(obj)) {
      return true;
    }
    return false;
  },

  // 当前域名
  domain() {
    const { hostname } = window.location;
    if (hostname.indexOf('.') !== -1) {
      const ds = hostname.split('.');
      if (!this.isNumber(ds[0])) {
        const len = ds.length;
        return `.${ds[len - 2]}.${ds[len - 1]}`;
      }
    }
    return hostname;
  }
};

export default util;
