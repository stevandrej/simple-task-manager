import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.css';

const NotFoundPage = () => {
	return(
		<div className='notFound'>
			<h4>HAHH Error braat 404</h4>
			<h4>page does not exist</h4>
			<Link to='/'>Go Home</Link>
		</div>
	)
}

export default NotFoundPage;