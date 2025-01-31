import { ScrollView, View } from "react-native"
import { Button, Text } from "react-native-paper"
import { useSession } from "../auth/context"
import LoanCalculationForm from "./forms/LoanCalculationForm"
import { useEffect, useState } from "react"
import { Loan, User } from "../types"
import LoanResults from "./results/LoanResults"
import ResultsTable from "./results/ResultsTable"
import { getUserSession } from "./api"
import NetInfo from '@react-native-community/netinfo';
import OfflineScreen from "../offline"

const HomeScreen = () => {
    const {signOut} = useSession()
    const [loanResults, setLoanResults] = useState<Loan>()
    const [user, setUser] = useState<User>()
    const [isConnected, setIsConnected] = useState<boolean | null>(true)
    
    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
          setIsConnected(state.isConnected)
        });
        
        return () => unsubscribe();
      }, [])

    useEffect(()=>{
        getUserSession().then((user)=>{
          setUser(user)
        }).catch((error) => {
          console.log(error.response.data)
          if(error.response.status === 401){
            signOut()
          }
        })
      },[])
    
    return(
        <ScrollView style={{padding: 10}}>
            <View style={{paddingTop: 30, gap: 20}}>
                {!isConnected && <OfflineScreen />}
              <Text style={{textAlign: 'center', fontSize: 24, fontWeight: 'bold'}}>Loan Calculator</Text>
              {user && <Text style={{textAlign: 'center', fontSize: 24, fontWeight: 'bold'}}>Hello, {user.name}</Text>}
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>Amortized Loan: Paying Back a Fixed Amount Periodically</Text>
              {/* <Button onPress={signOut}>Sign Out</Button> */}
            </View>
            <View style={{padding: 10}}>
                <LoanCalculationForm setLoanResults={setLoanResults}/>
            </View>
            <View style={{marginVertical: 20, gap: 10}}>
                {loanResults && <LoanResults data={loanResults}/>}
                {loanResults && <ResultsTable data={loanResults}/>}
            </View>
        </ScrollView>
    )
}

export default HomeScreen