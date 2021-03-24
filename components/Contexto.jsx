import { createContext, useContext, useState} from 'react';
import {io,Socket} from "socket.io-client";

const AppContext = createContext([Socket,()=>{}]);

export function AppWrapper({ children }) {

  const [Socket, setSocket] = useState(io);
  return (
    <AppContext.Provider value={[
      [Socket, setSocket]
    ]}>
      {children}
    </AppContext.Provider>
  );
}


export function useAppContext() {
  return useContext(AppContext);
}