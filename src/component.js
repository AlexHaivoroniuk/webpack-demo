export default (text = 'WP') => {
	const element = document.createElement('div');
	element.innerHTML = text;
	return element;
}