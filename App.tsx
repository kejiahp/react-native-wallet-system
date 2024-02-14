import "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";
import { useCallback, useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import WelcomeStackNavigator from "./src/navigation/WelcomeStack";
import Toast from "react-native-toast-message";
import { CustomToast } from "./src/ui/CustomToast";
import { AuthContext } from "./src/context/AuthContext";
import Spinner from "./src/components/Spinner";
import { getFromSecureStore } from "./src/storage/secure.storage";
import { securekeys } from "./src/utils/async.keys";

const toastConfig = {
  custom: CustomToast,
};

export default function App() {
  const [authStatusLoading, setAuthStatusLoading] = useState<
    "loading" | "error" | "success"
  >("loading");
  const { authState, setAuthState } = useContext(AuthContext);

  const checkIfSessionExist = useCallback(async () => {
    try {
      const value = await getFromSecureStore(securekeys.auth_tokens);
      if (!value) {
        throw new Error("session not found in secure store");
      } else {
        const jwtTokens = JSON.parse(value);

        setAuthState({
          accessToken: jwtTokens.accessToken,
          refreshToken: jwtTokens.refreshToken,
          authenticated: true,
        });
      }
      setAuthStatusLoading("success");
    } catch (error: any) {
      console.log(`Keychain Error: ${error.message}`);
      setAuthStatusLoading("error");

      setAuthState({
        accessToken: undefined,
        refreshToken: undefined,
        authenticated: false,
      });
    }
  }, []);

  useEffect(() => {
    checkIfSessionExist();
  }, [checkIfSessionExist]);

  if (authStatusLoading === "loading") {
    return <Spinner />;
  }

  return (
    <>
      <NavigationContainer>
        <WelcomeStackNavigator />
      </NavigationContainer>
      <Toast config={toastConfig} />
    </>
  );
}
