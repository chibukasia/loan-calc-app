import SignInScreen from "@/screens/auth/SignIn"
import { SafeAreaView } from "react-native-safe-area-context"

const SignIn = () => {
    return(
        <SafeAreaView style={{padding: 10}}>
            <SignInScreen />
        </SafeAreaView>
    )
}

export default SignIn