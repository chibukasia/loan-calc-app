import { useWindowDimensions, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useSession } from "./context";
import { useRouter } from "expo-router";
import FormInput from "@/components/Fields/FormInput";
import { useForm } from "react-hook-form";

const SignInScreen = () => {
  const { signIn } = useSession();
  const router = useRouter();
  const { height } = useWindowDimensions();

  const { control, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log(data)
    signIn()
    router.replace('/');
  }
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: height * 0.8,
        gap: 40
      }}
    >
      <Text style={{textAlign: 'center', fontSize: 18, fontWeight: 'bold'}}>Sign In Here</Text>
      <View style={{flexDirection: 'column', gap: 10}}>
        <FormInput
          control={control}
          name="email"
          label="Email"
          required
          type="email"
        />
        <FormInput control={control} name="password" label="Password" secret required/>
      </View>
      <View style={{ alignItems: "center", display: 'flex', flexDirection: 'column', gap: 20 }}>
        <Button mode="contained" style={{ width: 200 }} onPress={handleSubmit(onSubmit)}>
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

      {/* <Text
        onPress={() => {
          signIn();
          // Navigate after signing in. You may want to tweak this to ensure sign-in is
          // successful before navigating.
          router.replace('/');
        }}>
        Sign In
      </Text> */}
    </View>
  );
};

export default SignInScreen;
