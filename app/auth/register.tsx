import RegisterScreen from "@/screens/auth/Register"
import { SafeAreaView } from "react-native-safe-area-context"

const Register = () => {
    return(
        <SafeAreaView style={{padding: 10}}>
            <RegisterScreen />
        </SafeAreaView>
    )
}

export default Register