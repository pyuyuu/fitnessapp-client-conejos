import { createContext } from 'react';

const UserContext = createContext({
    user: null,
    setUser: () => {},
    unsetUser: () => {}
});

export const UserProvider = UserContext.Provider;
export default UserContext;