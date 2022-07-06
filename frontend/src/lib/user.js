var _user = {};

export const setUser = (user) => {
  _user = user;
}

export const getUser = () => {
  if (Object.keys(_user).length === 0)
    return null;

  return _user;
};
