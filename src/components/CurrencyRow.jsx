import React from 'react';
import './styles/CurrencyRow.css';


function CurrencyRow({title, value, options, readOnly, setAmount, exchangeTo, setExchangeTo}) {

	const handleChange = (e) => {
		setAmount(e.target.value.replace(/[^0-9]/g, ""));
	};

	return (
		<div className='currencyrow-container'>
			<div className='currency-label-container'>
				<label>{title}</label>

				{readOnly ? 
					<input type="text" value={value} readOnly={true} style={{opacity:0.7}}/>
					:
					<input type="text" value={value} onChange={handleChange}/>
				}
				
			</div>

			<select value={exchangeTo} defaultValue={"GBP"} onChange={(e) => setExchangeTo(e.target.value)}>
				{options && options.map(option => {
					return <option value={option}>{option}</option>
				})}
			</select>
		</div>
	);
}

export default CurrencyRow