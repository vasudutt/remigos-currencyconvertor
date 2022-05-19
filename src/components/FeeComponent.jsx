import React from 'react';
import './styles/FeeComponent.css';

function FeeComponent({value, text, bold, symbol}) {
  return (
	<div className='fee-container'>
		<div className='chain-bar'>
			<div className="chain-circle">
				<p className='chain-circle-text'>{symbol}</p>
			</div>
		</div>

		<div className={ bold ? 'fee-text bold' : 'fee-text' }>
			<p className='right-margin'>{value}</p>
			<p>{text}</p>
		</div>
	</div>
  )
}

export default FeeComponent