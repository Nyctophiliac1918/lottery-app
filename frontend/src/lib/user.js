var _user = {};

export const setUser = (user) => {
  if (user)
    _user = user;
}

export const getUser = () => {
  if (Object.keys(_user).length === 0)
    return null;

  return _user;
};

export const setUsersData = ({availableTickets, events}) => {
  const user = _user;

  user.tickets = availableTickets;
  user.event = events;

  _user = user;
}
