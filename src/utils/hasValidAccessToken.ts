const hasValidAccessToken = () => {
  if (localStorage.getItem('credentials')) {
    const { accessTokenExpirationTime } = JSON.parse(
      localStorage.getItem('credentials')!
    );

    if (accessTokenExpirationTime > Date.now() / 1000) {
      return true;
    }
  }

  return false;
};

export default hasValidAccessToken;
