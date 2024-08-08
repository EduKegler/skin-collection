export const getExpiresCookieDate = (seconds: number) => {
  const expires = new Date();
  expires.setSeconds(expires.getSeconds() + seconds);
  return expires;
};
