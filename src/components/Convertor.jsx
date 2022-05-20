import React, { useEffect, useState } from 'react';
import './styles/Convertor.css'
import CurrencyRow from './CurrencyRow';
import FeeComponent from './FeeComponent';

const API_KEY = 'bSUb70E4nK27fMRpqHTTZNukPGPQDCO9';
const base = 'INR';
const symbols = 'GBP%2CUSD%2CCAD%2CAUD'
const API_URL = `https://api.apilayer.com/exchangerates_data/latest?symbols=${symbols}&base=${base}`

function Convertor() {
	const [amount, setAmount] = useState(0);
	const [exchangeRateData, setExchangeRateData] = useState({});
	const [exchangeRate, setExchangeRate] = useState(0);
	const [exchangeTo, setExchangeTo] = useState('GBP');
	const [transferredAmount, setTransferredAmount] = useState(0);

	const fee = (amount < 1424.10) ? 1424.10 : Math.round((1424.10 + (0.005 * amount)) * 100) / 100;
	const toConvert = (fee > amount) ? 0 : Math.round((amount - fee) * 100) / 100;
	const convertedAmount = Math.round((toConvert / exchangeRate) * 100) / 100;

	var myHeaders = new Headers();
	myHeaders.append("apikey", API_KEY);
	const requestOptions = {
		method: 'GET',
		redirect: 'follow',
		headers: myHeaders
	};

	useEffect(() => {
		console.log('FETCHING...');
		fetch(API_URL, requestOptions)
			.then(response => response.text())
			.then(result => setExchangeRateData(JSON.parse(result)))
			.catch(error => console.log('error', error));
	}, []);

	useEffect(() => {
		if (exchangeRateData["rates"]) {
			setExchangeRate(prev => {
				return Math.round(1 / exchangeRateData["rates"][exchangeTo] * 100) / 100;
			});
		}
	}, [exchangeRateData, exchangeTo]);

	const handleTransfer = () => {
		setAmount(0);
		setTransferredAmount(prev => {
			return Math.round((prev + toConvert) * 100) / 100;
		});
	}

	return (
		<div className='convertor-container'>
			<div className='transferred-container'>
				<label>Amount transferred this year?</label>
				<input type="text" value={`${transferredAmount} INR`} readOnly={true} />
			</div>

			<CurrencyRow
				title={"You send"}
				value={amount}
				setAmount={setAmount}
				options={['INR']}
			/>

			<FeeComponent value={fee} text={"Our fees"} symbol={"-"} />
			<FeeComponent value={toConvert} text={"Total Amount (Inc. GST)"} />
			<FeeComponent value={toConvert} text={"Amount we'll convert"} bold={true} />
			<FeeComponent value={exchangeRate} symbol={"÷"} text={"Exchange Rate"} />

			<CurrencyRow
				title={"Recipient gets"}
				value={convertedAmount}
				options={['GBP', 'CAD', 'USD', 'AUD']}
				setExchangeTo={setExchangeTo}
				exchangeTo={exchangeTo}
				readOnly={true}
			/>

			<button className="transfer-btn" onClick={handleTransfer}>Transfer Money</button>
		</div>
	);
}

export default Convertor