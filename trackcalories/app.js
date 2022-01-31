// Storage controller

// Item Controller

const ItemCtrl = (function () {
	//Item Constructor
	const Item = function (id, name, calories) {
		this.id = id;
		this.name = name;
		this.calories = calories;
	};

	//Data Strructures / State

	const data = {
		items: [
			// { id: 0, name: 'Steak Dinner', calories: 1200 },
			// { id: 1, name: 'Cookie', calories: 400 },
			// { id: 2, name: 'Eggs', calories: 300 },
		],
		currentItem: null,
		totalCalories: 0,
	};

	// public methods
	return {
		getItems: function () {
			return data.items;
		},
		addItems: function (name, calories) {
			let ID;
			// create ID
			if (data.items.length > 0) {
				ID = data.items[data.items.length - 1].id + 1;
			} else {
				ID = 0;
			}

			//calories to number
			calories = parseInt(calories);

			//create new item
			newItem = new Item(ID, name, calories);

			// add to items array
			data.items.push(newItem);

			return newItem;
		},
		getTotalCalories: function () {
			let total = 0;

			//loop throu items and add calories
			data.items.forEach(function (item) {
				total += item.calories;
			});

			// set total calories
			data.totalCalories = total;

			// return total
			return data.totalCalories;
		},
		logData: function () {
			return data;
		},
	};
})();

//UI controller
const UICtrl = (function () {
	const UISelectors = {
		itemList: '#item-list',
		addBtn: '.add-btn',
		itemNameInput: '#item-name',
		itemCaloriesInput: '#item-calories',
		totalCalories: '.total-calories',
	};
	// public methods
	return {
		populateItemList: function (items) {
			let html = '';
			items.forEach((item) => {
				html += `<li id="item-${item.id}" class="collection-item"><strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="" class="secondary-content"><i class=" edit-item fa fa-pencil-square-o"></i></a></li>`;
			});
			// Insert list items
			document.querySelector(UISelectors.itemList).innerHTML = html;
		},
		getItemInput: function () {
			return {
				name: document.querySelector(UISelectors.itemNameInput).value,
				calories: document.querySelector(UISelectors.itemCaloriesInput).value,
			};
		},
		addListItem: function (item) {
			// show the list
			document.querySelector(UISelectors.itemList).style.display = 'block';
			// create li element
			const li = document.createElement('li');
			//add class
			li.className = 'collection-item';
			//add id
			li.id = `item-${item.id}`;
			//add html
			li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
		 <a href="" class="secondary-content"><i class=" edit-item fa fa-pencil-square-o">`;
			//insert item
			document
				.querySelector(UISelectors.itemList)
				.insertAdjacentElement('beforeend', li);
		},
		getSelectors: function () {
			return UISelectors;
		},
		showTotalCalories: function (totalCalories) {
			document.querySelector(UISelectors.totalCalories).textContent =
				totalCalories;
		},
		clearFields: function () {
			return {
				name: (document.querySelector(UISelectors.itemNameInput).value = ''),
				calories: (document.querySelector(UISelectors.itemCaloriesInput).value =
					''),
			};
		},
		hideList: function () {
			document.querySelector(UISelectors.itemList).style.display = 'none';
		},
	};
})();

//App Controller
const App = (function (ItemCtrl, UICtrl) {
	// Load Events Listners
	const loadEventListners = function () {
		//Get UI selectors
		const UISelectors = UICtrl.getSelectors();

		// Add Items events
		document
			.querySelector(UISelectors.addBtn)
			.addEventListener('click', itemAddSubmit);
	};

	// Add Item Submit
	const itemAddSubmit = function (e) {
		// Get form input from Ui controler
		const input = UICtrl.getItemInput();

		// check for both fields to be field

		if (input.name !== '' && input.calories !== '') {
			// add item

			const newItem = ItemCtrl.addItems(input.name, input.calories);
			// add item to UI list
			UICtrl.addListItem(newItem);

			//  Get total calories
			const totalCalories = ItemCtrl.getTotalCalories();
			// Add total calories to UI
			UICtrl.showTotalCalories(totalCalories);
			//clear fields
			UICtrl.clearFields();
		}

		e.preventDefault();
	};
	// Public Methods
	return {
		init: function () {
			// fetch items from data structure
			const items = ItemCtrl.getItems();

			//check if any items
			if (items.length === 0) {
				UICtrl.hideList();
			} else {
				//Polulate items
				UICtrl.populateItemList(items);
			}

			//  Get total calories
			const totalCalories = ItemCtrl.getTotalCalories();
			// Add total calories to UI
			UICtrl.showTotalCalories(totalCalories);

			// Load event Listners

			loadEventListners();
		},
	};
})(ItemCtrl, UICtrl);

// Initialing app
App.init();
