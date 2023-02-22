// 인벤토리 데이터
const inventoryData = [];

// HTML 요소 참조
const addFormItem = document.getElementById('add-item-form');
const inventoryTable = document.getElementById('inventory');
const exportBtn = document.getElementById('export-btn');

// 데이터 삽입 함수
function insertInventoryData() {
  const tbody = inventoryTable.getElementsByTagName('tbody')[0];
  tbody.innerHTML = '';
  for (let i = 0; i < inventoryData.length; i++) {
    const row = tbody.insertRow(i);
    const itemCell = row.insertCell(0);
    const quantityCell = row.insertCell(1);
    const priceCell = row.insertCell(2);
    const inCell = row.insertCell(3);
    const outCell = row.insertCell(4);
    const deleteCell = row.insertCell(5);

    itemCell.innerHTML = inventoryData[i].name;
    quantityCell.innerHTML = inventoryData[i].quantity;
    priceCell.innerHTML = inventoryData[i].price;
    inCell.innerHTML = '<button class="in-btn">In</button>';
    outCell.innerHTML = '<button class="out-btn">Out</button>';
    deleteCell.innerHTML = '<button class="delete-btn">Delete</button>';
  }
}

// 데이터 추가 함수
function addInventoryData(event) {
  event.preventDefault();
  const itemName = document.getElementById('item-name').value;
  const itemQuantity = parseInt(document.getElementById('item-quantity').value);
  const itemPrice = parseInt(document.getElementById('item-price').value);
  const itemData = { name: itemName, quantity: itemQuantity, price: itemPrice };
  inventoryData.push(itemData);
  insertInventoryData();
  addFormItem.reset();
}

// 데이터 삭제 함수
function deleteInventoryData(event) {
  const row = event.target.parentNode.parentNode;
  const rowIndex = row.rowIndex - 1;
  inventoryData.splice(rowIndex, 1);
  insertInventoryData();
}

// Excel 내보내기 함수
function exportToExcel() {
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.table_to_sheet(inventoryTable);
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Inventory');
  XLSX.writeFile(workbook, 'inventory.xlsx');
}

// 이벤트 처리
addFormItem.addEventListener('submit', addInventoryData);
inventoryTable.addEventListener('click', function (event) {
  if (event.target.className === 'delete-btn') {
    deleteInventoryData(event);
  }
});
exportBtn.addEventListener('click', exportToExcel);

// 데이터 증가 함수
function increaseInventoryData(event) {
	const row = event.target.parentNode.parentNode;
	const rowIndex = row.rowIndex - 1;
	const quantityInput = prompt('Enter quantity to increase:', '1');
	const quantity = parseInt(quantityInput);
	if (!isNaN(quantity)) {
	  inventoryData[rowIndex].quantity += quantity;
	  insertInventoryData();
	}
  }
  
  // 데이터 감소 함수
  function decreaseInventoryData(event) {
	const row = event.target.parentNode.parentNode;
	const rowIndex = row.rowIndex - 1;
	const quantityInput = prompt('Enter quantity to decrease:', '1');
	const quantity = parseInt(quantityInput);
	if (!isNaN(quantity)) {
	  inventoryData[rowIndex].quantity -= quantity;
	  insertInventoryData();
	}
  }
  
  // 이벤트 처리
  addFormItem.addEventListener('submit', addInventoryData);
  inventoryTable.addEventListener('click', function (event) {
	if (event.target.className === 'delete-btn') {
	  deleteInventoryData(event);
	} else if (event.target.className === 'in-btn') {
	  increaseInventoryData(event);
	} else if (event.target.className === 'out-btn') {
	  decreaseInventoryData(event);
	}
  });
  exportBtn.addEventListener('click', exportToExcel);
  
