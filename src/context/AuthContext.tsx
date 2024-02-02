import {
  PropsWithChildren,
  SetStateAction,
  createContext,
  useState,
} from "react";

type AuthStateType = {
  accessToken: string | undefined;
  refreshToken: string | undefined;
  authenticated: boolean;
};

type AuthContextType = {
  authState: AuthStateType;
  setAuthState: React.Dispatch<SetStateAction<AuthStateType>>;
  logOut: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  authState: {
    accessToken: undefined,
    refreshToken: undefined,
    authenticated: false,
  },
  setAuthState: () => {},
  logOut: () => {},
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [authState, setAuthState] = useState<AuthStateType>({
    accessToken: undefined,
    refreshToken: undefined,
    authenticated: false,
  });

  const logOut = () =>
    setAuthState({
      accessToken: undefined,
      refreshToken: undefined,
      authenticated: false,
    });

  return (
    <AuthContext.Provider value={{ authState, setAuthState, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}