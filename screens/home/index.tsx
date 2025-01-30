import { ScrollView, View } from "react-native"
import { Button, Text } from "react-native-paper"
import { useSession } from "../auth/context"
import LoanCalculationForm from "./forms/LoanCalculationForm"

const HomeScreen = () => {
    const {signOut} = useSession()
    return(
        <ScrollView style={{padding: 10}}>
            <View style={{paddingTop: 30, gap: 20}}>
              <Text style={{textAlign: 'center', fontSize: 24, fontWeight: 'bold'}}>Loan Calculator</Text>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>Amortized Loan: Paying Back a Fixed Amount Periodically</Text>
              {/* <Button onPress={signOut}>Sign Out</Button> */}
            </View>
            <View style={{padding: 10}}>
                <LoanCalculationForm />
            </View>
        </ScrollView>
    )
}

export default HomeScreen