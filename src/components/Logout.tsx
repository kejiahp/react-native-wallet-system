import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React, { useContext } from "react";
import { TouchableOpacity, View } from "react-native";

import { logoutService } from "../service/authentication.service";
import { notify } from "../ui/CustomToast";
import Label from "../ui/Label";
import { SIZES } from "../ui/style";
import { AxiosContext } from "../service/AxiosContext";
import { Feather } from "@expo/vector-icons";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";

type Props = {
  tintColor?: string | undefined;
  pressColor?: string | undefined;
  pressOpacity?: number | undefined;
};

export default function Logout(props: Props) {
  const { COLORS } = useContext(ThemeContext);
  const { authState, logOut } = useContext(AuthContext);
  const { authAxios } = useContext(AxiosContext);

  const logoutMtn = useMutation({
    mutationFn: logoutService,
    onSuccess: () => {
      notify({
        variant: "success",
        title: "Log out successful",
      });
      logOut();
    },
    onError: (error: any) => {
      if (error instanceof AxiosError) {
        if (error.response?.data.errors) {
          notify({
            variant: "error",
            title: error?.response?.data?.message || "Something went wrong",
            children: (
              <View>
                {error.response?.data.errors.map((item: any, index: number) => (
                  <Label key={index} style={{ fontSize: SIZES.xsmall }}>
                    {item.message}
                  </Label>
                ))}
              </View>
            ),
          });
        } else {
          notify({
            variant: "error",
            title: error?.response?.data?.message || "Something went wrong",
          });
        }
      } else {
        notify({
          variant: "error",
          title: error?.response?.data?.message || "Something went wrong",
        });
      }
    },
  });

  const onLogoutHandler = () => {
    if (!authAxios) {
      notify({
        variant: "error",
        title: "Invalid auth instance",
      });
      return;
    }
    if (!authState.refreshToken) {
      notify({
        variant: "error",
        title: "Invalid refresh token",
      });
      return;
    }

    logoutMtn.mutate({
      authInstance: authAxios,
      refresh_token: authState.refreshToken,
    });
  };

  return (
    <TouchableOpacity
      onPress={onLogoutHandler}
      disabled={logoutMtn.isPending}
      {...props}
    >
      <Feather name="log-out" size={25} color={COLORS.black} />
    </TouchableOpacity>
  );
}
