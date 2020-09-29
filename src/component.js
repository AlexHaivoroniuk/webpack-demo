export default (text = 'WebPack') => {
	const element = document.createElement('div');
	element.innerHTML = text;
	return element;
}