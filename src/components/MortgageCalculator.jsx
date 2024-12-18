import { useState } from "react"
import "./MortgageCalculator.css"
import { PiCalculatorFill } from "react-icons/pi";

export default function MortgageCalculator({getInfo}) {
    const [mortgageAmount, setMortgageAmount] = useState("");
    const [mortgageTerm, setMortgageTerm] = useState("");
    const [interestRate, setInterestRate] = useState("");
    const [mortgageType, setMortgageType] = useState("");
    const [mortgageAmountError, setMortgageAmountError] = useState("");
    const [mortgageTermError, setMortgageTermError] = useState("");
    const [interestRateError, setInterestRateError] = useState("");
    const [mortgageTypeError, setMortgageTypeError] = useState("");

    function handleSubmit(e) {
		e.preventDefault();
        
        let hasError = false;
        if (mortgageAmount === "") {setMortgageAmountError("empty"); hasError = true;}
        if (mortgageTerm === "") {setMortgageTermError("empty"); hasError = true}
        if (interestRate === "") {setInterestRateError("empty"); hasError = true}
        if (mortgageType === "") {setMortgageTypeError("empty"); hasError = true}

        if (hasError) {
            return;
        }

        getInfo({
            mortgageAmount: parseFloat(mortgageAmount.replace(/,/g, '')),
			mortgageTerm: mortgageTerm,
			interestRate: interestRate,
            mortgageType: mortgageType
        });
    }

    function clearAll() {
        setMortgageAmount("");
        setMortgageTerm("");
        setInterestRate("");
        setMortgageType("");
    }

    function handleAmountChange(e) {
        setMortgageAmountError("");
        if (e.target.value === '') {
            setMortgageAmount("");
            return;
        }
        const val = e.target.value.replace(/[^0-9.]/g, '');
        if (val === "") return;
        const formattedVal = parseFloat(val).toLocaleString();
        setMortgageAmount(formattedVal);
    }

    function handleTermChange(e) {
        setMortgageTermError("");
        setMortgageTerm(e.target.value);
    }

    function handleRateChange(e) {
        setInterestRateError("");
        setInterestRate(e.target.value);
    }

    function handleTypeChange(e) {
        setMortgageTypeError("");
        setMortgageType(e.target.value);
    }

    return (
        <section className="mortgage-calculator">
            <header>
                <h1>Mortgage Calculator</h1>
                <button onClick={clearAll} className="clear-btn">Clear All</button>
            </header>
            <form onSubmit={handleSubmit} action="">
                <label htmlFor="input-amount">
                    <div className="input-description">Mortgage Amount</div>
                    <div className={`input-block ${mortgageAmountError !== "" ? "error" : ""}`}>
                        <div className={`input-sign ${mortgageAmountError !== "" ? "error" : ""}`}>$</div>
                        <input onChange={handleAmountChange} value={mortgageAmount} type="text" id="input-amount" />
                    </div>
                    {mortgageAmountError === "empty" && <p className="error-message">This field is required</p>}
                </label>
                <div className="two-inputs-block">
                    <label htmlFor="input-term">
                        <div className="input-description">Mortgage Term</div>
                        <div className={`input-block ${mortgageTermError !== "" ? "error" : ""}`}>
                            <div className={`input-sign ${mortgageTermError !== "" ? "error" : ""}`}>years</div>
                            <input onChange={handleTermChange} value={mortgageTerm} type="number" id="input-term" />
                        </div>
                    {mortgageTermError === "empty" && <p className="error-message">This field is required</p>}
                    </label>
                    <label htmlFor="input-interest">
                        <div className="input-description">Interest Rate</div>
                        <div className={`input-block ${interestRateError !== "" ? "error" : ""}`}>
                            <div className={`input-sign ${interestRateError !== "" ? "error" : ""}`}>%</div>
                            <input onChange={handleRateChange} value={interestRate} type="number" id="input-interest" />
                        </div>
                    {interestRateError === "empty" && <p className="error-message">This field is required</p>}
                    </label>
                </div>
                <div className="radio-block">
                    <div className="input-description">Mortgage Type</div>
                    <label className="radio-input" htmlFor="radio-repayment">
                        <input type="radio" value="repayment" checked={mortgageType === "repayment"} onChange={handleTypeChange} name="mortgage-type" id="radio-repayment"  />
                        Repayment
                    </label>
                    <label className="radio-input" htmlFor="radio-interest-only">
                        <input type="radio" value="interestOnly" checked={mortgageType === "interestOnly"} onChange={handleTypeChange} name="mortgage-type" id="radio-interest-only"  />
                        Interest only
                    </label>
                    {mortgageTypeError === "empty" && <p className="error-message">This field is required</p>}
                </div>
                <button><PiCalculatorFill className="calculator-icon"/>Calculate Repayments</button>
            </form>
        </section>
    )
}