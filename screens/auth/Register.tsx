import FormInput from "@/components/Fields/FormInput";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useWindowDimensions, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { userSchema } from "./schema";

const RegisterScreen = () => {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(userSchema)
  });
  const router = useRouter();
  const { height } = useWindowDimensions();

  const onSubmit = (data: any) => {
    console.log(data);
  };
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
      <Text style={{textAlign: 'center', fontSize: 18, fontWeight: 'bold'}}>Register Here</Text>
      <View style={{flexDirection: 'column', gap: 10}}>
        <FormInput control={control} name="name" label="Full Name" required />
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
      <View style={{ alignItems: "center", display: 'flex', flexDirection: 'column', gap: 20 }}>
        <Button
          onPress={handleSubmit(onSubmit)}
          mode="contained"
          style={{ width: 200 }}
        >
          Sign Up
        </Button>
        <Text>
          Already have an account?{" "}
          <Text
            onPress={() => router.replace("/auth/signin")}
            style={{ fontWeight: "bold" }}
          >
            Sign In
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default RegisterScreen;
