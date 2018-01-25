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
	getSelectedCat: function(){
		return this.allCats.get(this.selectedCatId);
	},
	initialize(){
		//add Furlicity and make her the chosen one
		let furlicity = new Cat('img/furlicity.jpg', 'Furlicity', '1');
		model.addCat(furlicity);
		model.selectedCatId = furlicity.id;

		//add Mackerel
		let mackerel = new Cat('img/mackerel.jpg', 'Mackerel', '2');
		model.addCat(mackerel);

		//add Snowball
		let snowball = new Cat('img/snowball.jpg', 'Snowball', '3');
		model.addCat(snowball);

		//add Buddy
		let buddy = new Cat('img/buddy.jpg', 'Buddy', '4');
		model.addCat(buddy);

		//add The Twins
		let twins = new Cat('img/thetwins.jpg', 'The Twins', '5');
		model.addCat(twins);
	}
};

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
	update(img, name, clicks){
		this.img = img;
		this.name = name;
		this.clicks = clicks;
	}
	addClick(){
		this.clicks++;
	}
}

//-------------------------------------------------------------

var octopus = {
	initializeApplication: function(){
		model.initialize();
		catListView.renderCatSelectionList(model.selectedCatId);
		catView.initializeCatView();
		octopus.selectCat(model.selectedCatId);
		const selectedCat = model.getCat(model.selectedCatId);
		adminView.initializeAdminView(selectedCat);
	},

	getSelectedCat(){
		return model.getSelectedCat();
	},

	selectCat: function(selectedCatId){
		model.selectedCatId = selectedCatId;
		const selectedCat = model.getCat(selectedCatId);
		catView.renderCat(selectedCat);
	},

	clickCat: function(clickedCatId){
		debugger;
		const clickedCat = model.getCat(clickedCatId);
		clickedCat.addClick();
		catView.updateClickCount(clickedCat);
	},

	updateCat: function(id, img, name, clicks){
		const selectedCat = model.getCat(id);
		selectedCat.update(img, name, clicks);
		catView.renderCat(selectedCat);
		catListView.renderCatSelectionList(id);
	}
};

//---------------------------------------------------------------
var catView = {
	initializeCatView: function(selectedCat){
		this.catNameElement = document.querySelector('.cat-name');
		this.clicksElement = document.querySelector('.clicks');

		this.catImage = document.querySelector('.cat-pic');
		this.catImage.addEventListener('click', function(event){
			catView.handleCatImageClick(event);
		});
	},

	renderCat(selectedCat){
		this.catNameElement.innerText = selectedCat.name;

		this.catImage.setAttribute('src', selectedCat.img);
		this.catImage.setAttribute('data-key', selectedCat.id);

		this.clicksElement.innerText = selectedCat.clicks;
	},

	updateClickCount: function(cat){
		this.clicksElement.innerText = cat.clicks;
	},

	handleCatImageClick: function(event){

		//only handle click events on cat-pics
		if(event.target.nodeName.toLowerCase() == 'img'){
			//figure out which cat & register click
			const catId = event.target.getAttribute('data-key');
			octopus.clickCat(catId);
		}
	}
};


var catListView = {
	renderCatSelectionList: function(selectedCatId){

		this.catListElem = document.querySelector('.cat-list');
		this.catListElem.innerHTML = '';

		for([id, cat] of model.allCats){
			const catOption = document.createElement('div');
			catOption.classList.add('cat-option');
			catOption.setAttribute('id', id);
			catOption.textContent = cat.name;

			if(cat.id == selectedCatId){
				catOption.classList.add('selected');
			}
			catOption.addEventListener('click', function(event){
				catListView.handleCatOptionClick(event);
			});
			this.catListElem.appendChild(catOption);
		}
	},

	handleCatOptionClick: function(event){
		debugger;
		const selectedOption = event.target.closest('.cat-option');
		const allOptions = document.querySelectorAll('.cat-option');
		for(option of allOptions){
			option.classList.remove('selected');
		}
		selectedOption.classList.add('selected');
		const selectedCatId = selectedOption.id;
		octopus.selectCat(selectedCatId);
	}
};

var adminView = {
	initializeAdminView: function(selectedCat){
		//get admin view HTML elements
		this.adminForm = document.querySelector('.admin-form');
		this.adminBtn = document.getElementById('admin-btn');
		this.adminSaveBtn = document.getElementById('admin-save-btn');
		this.adminIdInput = document.getElementById('admin-cat-id');
		this.adminNameInput = document.getElementById('admin-cat-name');
		this.adminImgInput = document.getElementById('admin-cat-img');
		this.adminClicksInput = document.getElementById('admin-cat-clicks');

		//add event listeners
		this.adminBtn.addEventListener('click', function(){
			adminView.renderAdminForm();
		});

		this.adminSaveBtn.addEventListener('click', function(){
			adminView.submitAdminForm();
		});
	},

	renderAdminForm: function(){
		const selectedCat = octopus.getSelectedCat();

		//fill in form with selected cat's info
		this.adminImgInput.value=selectedCat.img;
		this.adminNameInput.value=selectedCat.name;
		this.adminIdInput.value=selectedCat.id;
		this.adminClicksInput.value=selectedCat.clicks;

		this.adminForm.style.display = 'block';
		this.adminBtn.style.display = 'none';
	},

	submitAdminForm: function(){
		const id = this.adminIdInput.value;
		const img = this.adminImgInput.value;
		const name = this.adminNameInput.value;
		const clicks = this.adminClicksInput.value;
		octopus.updateCat(id, img, name, clicks);

		this.adminForm.style.display = 'none';
		this.adminBtn.style.display = 'block';
	}
};

document.addEventListener('DOMContentLoaded', octopus.initializeApplication());