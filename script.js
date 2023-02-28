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
    const inHistoryCell = row.insertCell(5); // 새로운 열: 입고 내역
    const outHistoryCell = row.insertCell(6); // 새로운 열: 출고 내역
    const deleteCell = row.insertCell(7);

    itemCell.innerHTML = inventoryData[i].name;
    quantityCell.innerHTML = inventoryData[i].quantity;
    priceCell.innerHTML = inventoryData[i].price;
    inCell.innerHTML = '<button class="in-btn">In</button>';
    outCell.innerHTML = '<button class="out-btn">Out</button>';
    inHistoryCell.innerHTML = '<button class="in-history-btn">In History</button>'; // 새로운 버튼: 입고 내역 버튼
    outHistoryCell.innerHTML = '<button class="out-history-btn">Out History</button>'; // 새로운 버튼: 출고 내역 버튼
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
  
  // 현재 날짜 문자열 생성
  const currentDate = new Date().toISOString().slice(0, 10);
  
  // 파일 이름에 현재 날짜 추가
  XLSX.writeFile(workbook, `inventory_${currentDate}.xlsx`);
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
  
// 입고 내역 버튼 클릭 시 이벤트 핸들러
function showInHistory(event) {
  const row = event.target.parentNode.parentNode;
  const rowIndex = row.rowIndex - 1;
  const itemData = inventoryData[rowIndex];
  alert(`입고 내역: ${itemData.inHistory.join(', ')}`);
}

// add this code to toggle between light and dark themes
const toggleDarkMode = () => {
  document.body.classList.toggle('dark-mode');
}

// add this code to create the button and attach the event listener
const darkModeBtn = document.createElement('button');
darkModeBtn.classList.add('dark-mode-btn');
darkModeBtn.textContent = 'Dark,Light';
darkModeBtn.addEventListener('click', toggleDarkMode);
document.body.appendChild(darkModeBtn);


function searchInventoryData(event) {
  event.preventDefault();
  const searchInput = document.getElementById('search-input').value;
  // 검색어를 처리하는 코드 작성
}


const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', searchInventoryData);
