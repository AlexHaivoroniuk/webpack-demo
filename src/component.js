export default (text = 'WebPack') => {
	const element = document.createElement('h2');
	element.innerHTML = text;
	return element;
}