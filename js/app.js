document.addEventListener('DOMContentLoaded', initialize);

class Model {
	constructor(){
		this.allCats = new Map();
	}
	addCat(cat){
		this.allCats.set(cat.id, cat);
	}
	getCat(catId){
		return this.allCats.get(catId);
	}
}

class Cat{
	constructor(img, name, id, selected = false){
		this.img = img;
		this.name = name;
		this.id = id;
		this.selected = selected;
		this.clicks = 0;
	}
	resetClickCounter(){
		this.clicks = 0;
	}
	addClick(){
		this.clicks++;
	}

	makeChosenOne(){
		const catName = document.querySelector('.cat-name');
		catName.innerText = this.name;

		const catImage = document.querySelector('.cat-pic');
		catImage.setAttribute('src', this.img);
		catImage.setAttribute('data-key', this.id);

		const clicks = document.querySelector('.clicks');
		clicks.classList.add('clicks');
		clicks.innerText = this.clicks;

		catImage.addEventListener('click', handleCatImageClick);
	}
}

let model;

function initialize(){

	initializeCats();
	initializeOptions();

}

function initializeOptions(){
	const container = document.querySelector('.cat-list');

	for([catName, cat] of model.allCats){
		const catOption = document.createElement('div');
		catOption.classList.add('cat-option');
		catOption.setAttribute('id', catName.toLowerCase());
		catOption.textContent = cat.name;

		if(cat.selected){
			catOption.classList.add('selected');
			cat.makeChosenOne();
		}

		catOption.addEventListener('click', handleCatOptionClick);
		container.appendChild(catOption);
	}

}

function initializeCats(){
	 model = new Model();

	//add Furlicity
	let furlicity = new Cat('img/furlicity.jpg', 'Furlicity', 'furlicity', true);
	model.addCat(furlicity);

	//add Mackerel
	let mackerel = new Cat('img/mackerel.jpg', 'Mackerel', 'mackerel');
	model.addCat(mackerel);

	//add Snowball
	let snowball = new Cat('img/snowball.jpg', 'Snowball', 'snowball');
	model.addCat(snowball);

	//add Buddy
	let buddy = new Cat('img/buddy.jpg', 'Buddy', 'buddy');
	model.addCat(buddy);

	//add The Twins
	let twins = new Cat('img/thetwins.jpg', 'The Twins', 'twins');
	model.addCat(twins);
}

function initializeList(){

	const catList = document.querySelector('.cat-list');

	for([catName, cat] of model.allCats){
		const catContainerDiv = cat.getHtml();
		container.appendChild(catContainerDiv);
	}
}

/*
 * Handle click event on a cat pic.
 *
 */
function handleCatImageClick(event){

	//only handle click events on cat-pics
	if(event.target.nodeName.toLowerCase() == 'img'){
		const catContainer = event.target.closest('.cat-container');
		const catId = event.target.getAttribute('data-key');

		const cat = model.getCat(catId);
		cat.addClick();

		const counter = catContainer.querySelector('.clicks');
		counter.innerText = cat.clicks;

	}
}

/*
 * Handle click event on a cat option.
 *
 */
function handleCatOptionClick(event){
	const selectedOption = event.target.closest('.cat-option');

	const options = document.querySelectorAll('.cat-option');
	for(option of options){
		option.classList.remove('selected');
	}
	selectedOption.classList.add('selected');

	const catId = selectedOption.id;
	const cat = model.getCat(catId);

	cat.makeChosenOne();
}