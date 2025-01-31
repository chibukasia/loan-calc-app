export interface Loan {
    id: string
    userId: string
    principalAmount: number
    interestRate: number
    interestRateType: string
    termMonths: number
    repaymentFrequency: string
    monthlyPayment: number
    createdAt: string
    updatedAt: string
    amortizationSchedules: AmortizationSchedule[]
    totalToBePaid: number
  }
  
  export interface AmortizationSchedule {
    id: string
    loanId: string
    paymentDate: string
    principalPaid: number
    interestPaid: number
    balance: number
    createdAt: string
    updatedAt: string
  }

  export interface User {
    id: string
    email: string
    name: string
    createdAt: string
    updatedAt: string
  }