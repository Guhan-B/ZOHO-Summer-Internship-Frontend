export const detectBrowser = () => {
  const UserAgent = navigator.userAgent;

  if(UserAgent.match(/chrome|chromium|crios/i)) return "Chrome";
  if(UserAgent.match(/firefox|fxios/i))         return "Firefox";
  if(UserAgent.match(/safari/i))                return "Safari";
  if(UserAgent.match(/opr\//i))                 return "Opera";
  if(UserAgent.match(/edg/i))                   return "Edge";

  return "Unknown Browser";
};

export const detectOS = () => {
    const UserAgent = navigator.userAgent;

    if(UserAgent.indexOf("Win")   != -1) return "Windows";
    if(UserAgent.indexOf("Mac")   != -1) return "MacOS";
    if(UserAgent.indexOf("X11")   != -1) return "UNIX";
    if(UserAgent.indexOf("Linux") != -1) return "Linux";

    return "Unknown OS";
}