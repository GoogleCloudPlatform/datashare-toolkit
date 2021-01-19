function isBrowserChrome() {
  var isChromium = window.chrome;
  var winNav = window.navigator;
  var vendorName = winNav.vendor;
  var isOpera = typeof window.opr !== 'undefined';
  var isIEedge = winNav.userAgent.indexOf('Edge') > -1;
  var isIOSChrome = winNav.userAgent.match('CriOS');

  if (isIOSChrome) {
    // is Google Chrome on IOS
    // console.log('Browser is Chrome on iOS');
    return true;
  } else if (
    isChromium !== null &&
    typeof isChromium !== 'undefined' &&
    vendorName === 'Google Inc.' &&
    isOpera === false &&
    isIEedge === false
  ) {
    // is Google Chrome
    // console.log('Browser is Chrome');
    return true;
  } else {
    // not Google Chrome
    // console.log('Browser is not Chrome');
    return false;
  }
}

export default {
  isBrowserChrome
};
