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
  }
};

export default util;
