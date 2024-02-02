import React, { useContext, useEffect, useState } from "react";
import Container from "../ui/Container";
import Label from "../ui/Label";
import { ScaledSheet } from "react-native-size-matters";
import { FONT, SIZES } from "../ui/style";
import { ThemeContext } from "../context/ThemeContext";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Button from "../ui/Button";
import { FormInputField } from "../ui/formFields/FormFields";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegistrationValidationSchemaType,
  registration_validation_schema,
} from "../schema/authentication.schema";
import * as ImagePicker from "expo-image-picker";
import { Feather } from "@expo/vector-icons";
import { Platform } from "react-native";
import { BASE_COLORS } from "../ui/theme";
import { Utilities } from "../utils/utilities";

export default function CreateAccount() {
  const { COLORS } = useContext(ThemeContext);
  const [image, setImage] = useState<
    ImagePicker.ImagePickerSuccessResult["assets"] | undefined
  >(undefined);

  useEffect(() => {
    (async () => {
      if (Platform.OS === "ios") {
        const cameraRollStatus =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
        if (
          cameraRollStatus.status !== "granted" ||
          cameraStatus.status !== "granted"
        ) {
          alert("Sorry, we need these permissions to make this work!");
        }
      }
    })();
  }, []);

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
    });

    if (result.canceled) {
      alert("Upload cancelled");
      return;
    } else {
      setImage(result.assets);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.canceled) {
      alert("Upload cancelled");
      return;
    } else {
      setImage(result.assets);
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationValidationSchemaType>({
    resolver: zodResolver(registration_validation_schema),
    mode: "all",
  });

  const onSubmitHandler = (inputData: RegistrationValidationSchemaType) => {
    if (!image) {
      return;
    }

    console.warn({
      image: {
        name: image[0].fileName,
        uri: image[0].uri,
        type: image[0].mimeType,
      },
      ...inputData,
    });
  };

  return (
    <Container
      outerViewStyle={[{ backgroundColor: COLORS.bgWhite }]}
      innerViewStyle={styles.container}
    >
      <View>
        <Label style={{ fontSize: SIZES.small }}>
          Please fill in your information.
        </Label>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            resizeMode="center"
            source={{
              uri: image
                ? image[0].uri
                : "https://th.bing.com/th/id/OIP.Va6UmVX0WYvsHhdZlzUHTgAAAA?w=200&h=200&rs=1&pid=ImgDetMain",
            }}
          />
          <View style={styles.imageSubContainer}>
            <Button onPress={takePhoto} style={styles.imageBtn}>
              <Feather name="camera" size={24} color={COLORS.black} />
              <Label style={{ fontSize: SIZES.xsmall, fontFamily: FONT.bold }}>
                Take photo
              </Label>
            </Button>
            <Button onPress={pickImage} style={styles.imageBtn}>
              <Feather name="image" size={24} color={COLORS.black} />
              <Label style={{ fontSize: SIZES.xsmall, fontFamily: FONT.bold }}>
                Choose photo
              </Label>
            </Button>
          </View>
        </View>

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormInputField
              label="Email"
              placeholder="example@email.com"
              keyboardType="email-address"
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              errorMessage={errors.email?.message}
            />
          )}
          name="email"
          defaultValue=""
        />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormInputField
              label="Create Password"
              placeholder="Example123@"
              secureTextEntry
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              errorMessage={errors.password?.message}
            />
          )}
          name="password"
          defaultValue=""
        />

        <Button onPress={handleSubmit(onSubmitHandler)} isLoading>
          <Label
            style={{
              fontSize: SIZES.medium,
              fontFamily: FONT.bold,
            }}
          >
            Create Account
          </Label>
        </Button>
      </View>
      <Label
        style={{
          marginTop: SIZES.medium,
          fontSize: SIZES.xsmall,
          textAlign: "center",
          gap: 6,
        }}
      >
        By continuing you agree to our{" "}
        <Text
          onPress={() => alert("We do not have terms nor conditions 😂")}
          style={{ color: COLORS.primary, fontFamily: FONT.bold }}
        >
          Terms and conditions
        </Text>{" "}
        and our{" "}
        <Text
          onPress={() => alert("We do not have privacy polices 😂")}
          style={{ color: COLORS.primary, fontFamily: FONT.bold }}
        >
          Privacy Policy
        </Text>
      </Label>
    </Container>
  );
}

const styles = ScaledSheet.create({
  container: {
    paddingTop: "20@s",
    justifyContent: "space-between",
  },
  imageContainer: {
    marginTop: "10@s",
    marginBottom: "10@s",
    flexDirection: "row",
    gap: SIZES.large,
  },
  imageSubContainer: {
    gap: SIZES.small,
  },
  imageBtn: {
    flexDirection: "row",
    gap: "10@s",
  },
  image: {
    backgroundColor: BASE_COLORS.gray100,
    width: SIZES.xxSmall * 10,
    height: SIZES.xxSmall * 10,
    borderWidth: 1,
    borderRadius: SIZES.xxSmall,
  },
});
