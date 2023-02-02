import React, { createContext, useState } from "react";
import { IUser } from "./interfaces";
interface IMainProvider {
  children?: React.ReactNode;
}
interface IMainContexts {
  user: IUser | null | undefined;
  setUser: Function;
}

export const MainContext = createContext<IMainContexts | null>(null);

export const MainProvider: React.FunctionComponent<IMainProvider> = ({
  children,
}: IMainProvider): JSX.Element => {
  const [user, setUser] = useState(undefined);
  return (
    <MainContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
