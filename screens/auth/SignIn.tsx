import { useWindowDimensions, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useSession } from "./context";
import { useRouter } from "expo-router";
import FormInput from "@/components/Fields/FormInput";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "./api";
import { setStorageItemAsync } from "./context/useStorageState";

const SignInScreen = () => {
  const { signIn } = useSession();
  const router = useRouter();
  const { height } = useWindowDimensions();

  const { control, handleSubmit } = useForm<{
    email: string;
    password: string;
  }>();

  const {mutate, isPending, error, isError} = useMutation({
    mutationKey: ["user"],
    mutationFn: (data: { email: string; password: string }) => loginUser(data),
    onSuccess(data, variables, context) {
        setStorageItemAsync('token', data.token)
        signIn(data.id)
        router.replace('/')
    },
    onError(error: any, variables, context) {
        console.log('error:::', error.response.data.error)
    },
  });

  const onSubmit = (data: { email: string; password: string }) => {
    mutate(data)
  };
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: height * 0.8,
        gap: 40,
      }}
    >
      <Text style={{ textAlign: "center", fontSize: 18, fontWeight: "bold" }}>
        Sign In Here
      </Text>
      {isError && <Text style={{color: 'red'}}>{error.response.data.error}</Text>}
      <View style={{ flexDirection: "column", gap: 10 }}>
        <FormInput
          control={control}
          name="email"
          label="Email"
          required
          type="email"
        />
        <FormInput
          control={control}
          name="password"
          label="Password"
          secret
          required
        />
      </View>
      <View
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <Button
          mode="contained"
          style={{ width: 200 }}
          loading={isPending}
          onPress={handleSubmit(onSubmit)}
        >
          Sign In
        </Button>
        <Text>
          Don't have an account?{" "}
          <Text
            onPress={() => router.replace("/auth/register")}
            style={{ fontWeight: "bold" }}
          >
            Sign Up
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default SignInScreen;
