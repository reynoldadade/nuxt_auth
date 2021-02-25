export default (isStaging, products) => {
	const hasBothProducts = products.length === 2;

	if (hasBothProducts) {
		return `https://${isStaging ? 'staging.' : ''}wa-communicate.com`;
	}

	return `https://${
		isStaging ? 'staging.' : ''
	}wa-${products[0].toLowerCase().slice(2)}.com`;
};
