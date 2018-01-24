/*
 * Model contains all of the data for the application.
 * Contains a map of all of our cats.
 */
var model = {
	allCats: new Map(),
	selectedCatId: '',
	addCat: function(cat){
		this.allCats.set(cat.id, cat);
	},
	getCat: function(catId){
		return this.allCats.get(catId);
	},
	initialize(){
		//add Furlicity and make her the chosen one
		let furlicity = new Cat('img/furlicity.jpg', 'Furlicity', 'furlicity');
		model.addCat(furlicity);
		model.selectedCatId = furlicity.id;

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
}

/*
 * Represents a single cat.
 */
class Cat{
	constructor(img, name, id){
		this.img = img;
		this.name = name;
		this.id = id;
		this.clicks = 0;
	}
}
//-------------------------------------------------------------

var octopus = {
	initializeApplication: function(){
		model.initialize();
		catListView.initializeCatSelectionList(model.selectedCatId);
		this.selectCat(model.selectedCatId);
	},

	selectCat: function(selectedCatId){
		model.selectedCatId = selectedCatId;
		let selectedCat = model.getCat(selectedCatId);
		catView.loadCat(selectedCat);
	},

	clickCat: function(clickedCatId){
		let clickedCat = model.getCat(clickedCatId);
		clickedCat.clicks++;
		catView.updateClickCount(clickedCat);
	}
}

//---------------------------------------------------------------
var catView = {
	loadCat: function(selectedCat){
		const catName = document.querySelector('.cat-name');
		catName.innerText = selectedCat.name;

		const catImage = document.querySelector('.cat-pic');
		catImage.setAttribute('src', selectedCat.img);
		catImage.setAttribute('data-key', selectedCat.id);
		catImage.addEventListener('click', this.handleCatImageClick);

		const clicks = document.querySelector('.clicks');
		clicks.classList.add('clicks');
		clicks.innerText = selectedCat.clicks;
	},

	updateClickCount: function(cat){
		//update page with new click count
		const counter = document.querySelector('.clicks');
		counter.innerText = cat.clicks;
	},

	handleCatImageClick: function(event){

		//only handle click events on cat-pics
		if(event.target.nodeName.toLowerCase() == 'img'){
			//figure out which cat & register click
			const catId = event.target.getAttribute('data-key');
			octopus.clickCat(catId);
		}
	}
}


var catListView = {
	initializeCatSelectionList: function(selectedCatId){
		const container = document.querySelector('.cat-list');

		for([catName, cat] of model.allCats){
			const catOption = document.createElement('div');
			catOption.classList.add('cat-option');
			catOption.setAttribute('id', catName.toLowerCase());
			catOption.textContent = cat.name;

			if(cat.id == selectedCatId){
				catOption.classList.add('selected');
			}
			catOption.addEventListener('click', this.handleCatOptionClick);
			container.appendChild(catOption);
		}
	},

	handleCatOptionClick: function(event){
		const selectedOption = event.target.closest('.cat-option');
		const allOptions = document.querySelectorAll('.cat-option');
		for(option of allOptions){
			option.classList.remove('selected');
		}
		selectedOption.classList.add('selected');
		const selectedCatId = selectedOption.id;
		octopus.selectCat(selectedCatId);
	}
}

document.addEventListener('DOMContentLoaded', octopus.initializeApplication());