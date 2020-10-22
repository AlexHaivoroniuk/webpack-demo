export default (text = 'WebPack') => {
	const element = document.createElement('h2');
	element.className = 'rounded bg-red-100 border max-w-md m-4 p-4';
	element.innerHTML = text;
	return element;
}