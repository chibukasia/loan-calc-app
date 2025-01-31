import FormInput from "@/components/Fields/FormInput";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useWindowDimensions, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { userSchema } from "./schema";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerUser } from "./api";
import { useSession } from "./context";
import { setStorageItemAsync } from "./context/useStorageState";

export type EUser = z.infer<typeof userSchema>
const RegisterScreen = () => {
  const { control, handleSubmit } = useForm<EUser>({
    resolver: zodResolver(userSchema)
  });
  const router = useRouter();
  const { height } = useWindowDimensions();

  const queryClient = useQueryClient()
  const { signIn } = useSession()

  const {mutate, isPending} = useMutation({
    mutationKey: ['user'],
    mutationFn: (data: EUser) => registerUser(data),
    onSuccess(data, variables, context) {
        setStorageItemAsync('token', data.token)
        signIn(data.id)
        router.replace('/')
    },
    onError: (error)=>{
        console.log(error)
    }
  })

  const onSubmit = (data: EUser) => {
    mutate(data);
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
          loading={isPending}
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
