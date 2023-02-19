// Get the inventory table and form
const inventoryTable = document.querySelector('#inventory tbody');
const addItemForm = document.querySelector('#add-item-form');
const exportBtn = document.querySelector('#export-btn');

// Load the inventory from localStorage
let inventory = JSON.parse(localStorage.getItem('inventory')) || [];

// Render the inventory on the table
renderInventory();

// Add a new item to the inventory
addItemForm.addEventListener('submit', (event) => {
	event.preventDefault();
	const itemName = document.querySelector('#item-name').value;
	const itemQuantity = parseInt(document.querySelector('#item-quantity').value);
	const itemPrice = parseFloat(document.querySelector('#item-price').value);

	// Add the new item to the inventory
	inventory.push({ name: itemName, quantity: itemQuantity, price: itemPrice });

	// Save the updated inventory to localStorage
	localStorage.setItem('inventory', JSON.stringify(inventory));

	// Render the updated inventory on the table
	renderInventory();

	// Reset the form
	addItemForm.reset();
});

// Export the inventory to an Excel file
exportBtn.addEventListener('click', () => {
	// Create a new Excel workbook
	const workbook = XLSX.utils.book_new();

	// Create a new worksheet
	const worksheet = XLSX.utils.json_to_sheet(inventory);

	// Add the worksheet to the workbook
	XLSX.utils.book_append_sheet(workbook, worksheet, 'Inventory');

	// Export the workbook to an Excel file
	XLSX.writeFile(workbook, 'inventory.xlsx');
});

// Render the inventory on the table
function renderInventory() {
	inventoryTable.innerHTML = '';
	inventory.forEach((item) => {
		const row = document.createElement('tr');
		row.innerHTML = `
			<td>${item.name}</td>
			<td>${item.quantity}</td>
			<td>$${item.price.toFixed(2)}</td>
		`;
		inventoryTable.appendChild(row);
	});
}
