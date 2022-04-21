import React from 'react';

// Defaults to an undefined current user
const Context = React.createContext({
  currUser: undefined,
  setCurrUser: () => {},
});

export default Context;
