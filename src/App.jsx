import { useState } from 'react'
import './App.css'
import MortgageCalculator from "./components/MortgageCalculator"
import CalculationResults from "./components/CalculationResults"

function App() {
  const [mortgageInfo, setMortgageInfo] = useState({});

  return (
  <div className="main-box">
    <MortgageCalculator getInfo={setMortgageInfo} />
    <CalculationResults mortgageInfo={mortgageInfo} />
  </div>
  )
}

export default App
