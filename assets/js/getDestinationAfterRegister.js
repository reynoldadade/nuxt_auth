export default (isStaging, isGhanaian, products) => {
	const hasBothProductsOrNone =
		products.length === 2 || products.length === 0;

	if (hasBothProductsOrNone) {
		return `https://${isStaging ? 'staging.' : ''}wa-${
			isGhanaian ? 'communicate' : 'insight'
		}.com`;
	}

	return `https://${
		isStaging ? 'staging.' : ''
	}wa-${products[0].toLowerCase().slice(2)}.com`;
};
