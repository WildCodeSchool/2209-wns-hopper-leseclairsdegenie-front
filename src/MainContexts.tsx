import { useQuery } from "@apollo/client";
import React, { createContext, useEffect, useState } from "react";
import { me } from "./graphql/connection";
import { IUser } from "./interfaces";
interface IMainProvider {
  children?: React.ReactNode;
}
export interface IMainContexts {
  user: IUser | null | undefined;
  setUser: Function;
  refetch: Function;
}

export const MainContext = createContext<IMainContexts | null>(null);

export const MainProvider: React.FunctionComponent<IMainProvider> = ({
  children,
}: IMainProvider): JSX.Element => {
  const [user, setUser] = useState(undefined);
  const { data, refetch, error } = useQuery(me, {
    fetchPolicy: "network-only",
    errorPolicy: "ignore",
  });

  useEffect(() => {
    if (error) {
      setUser(undefined);
      console.log("Not user connected");
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      if (data.me) {
        setUser(data.me);
        console.log("User connected");
      }
    }
  }, [data]);
  return (
    <MainContext.Provider
      value={{
        user,
        setUser,
        refetch
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
