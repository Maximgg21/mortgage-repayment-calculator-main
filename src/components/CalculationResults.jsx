import "./CalculationResults.css"

export default function CalculationResults({mortgageInfo}) {
    const isEmpty = Object.keys(mortgageInfo).length === 0;
    const resultStyles = isEmpty ? {} : {justifyContent: 'start', textAlign: 'left'};

    const {mortgageAmount, mortgageTerm, interestRate, mortgageType} = mortgageInfo;
    const n = mortgageTerm * 12;    // convert to number of months
    const r = interestRate / (12 * 100); // convert to monthly interest rate
    const monthlyRepayment = mortgageType === "repayment"
    ? (mortgageAmount * r * (1 + r)**n) / ((1 + r)**n - 1) : mortgageAmount * r;
    const totalRepayment = monthlyRepayment * n;

    return (
        <section className="calculation-results" style={resultStyles}>
            {isEmpty ? 
            <div className="empty-results">
                <img className="results-img" src="src\assets\images\illustration-empty.svg" alt="" />
                <h1>Results shown here</h1>
                <p>Complete the form and click "calculate repayments" to see what your monthly repayments would be.</p>
            </div> :
            <div className="filled-results">
                <h1>Your results</h1>
                <p>Your results are shown below based on the information you provided. To adjust the results, edit the form and click "calculate repayments" again.</p>
                <div className="result-numbers">
                    <p>Your monthly repayments</p>
                    <div className="monthly-repayment">${Number(monthlyRepayment.toFixed(2)).toLocaleString()}</div>
                    <hr />
                    <p>Total you'll repay over the term</p>
                    <div className="total-repayment">${Number(totalRepayment.toFixed(2)).toLocaleString()}</div>
                </div>
            </div>}
        </section>
    )
}