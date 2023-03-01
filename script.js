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

// JavaScript
const loginForm = document.getElementById('login-form');
const logoutForm = document.getElementById('logout-form');
const dataTable = document.getElementById('inventory');

// get the login and logout buttons
const loginButton = document.getElementById('login-button');
const logoutButton = document.getElementById('logout-button');

// add a click event listener to the login button
loginButton.addEventListener('click', (event) => {
  event.preventDefault();

  // get the username and password fields
  const usernameField = document.getElementById('username');
  const passwordField = document.getElementById('password');

  // get the username and password values
  const username = usernameField.value;
  const password = passwordField.value;

  // send a request to the server to check the login credentials
  // assuming the server returns a success response with a status code of 200
  // we will hide the login form and show the logout form and the data table
  if (username === 'admin' && password === 'password') {
    sessionStorage.setItem('loggedIn', true); // save login status in session storage
    loginForm.style.display = 'none';
    logoutForm.style.display = 'block';
    dataTable.style.display = 'block';
  } else {
    alert('Invalid username or password.');
  }
});

// add a click event listener to the logout button
logoutButton.addEventListener('click', (event) => {
  event.preventDefault();

  // hide the logout form and the data table, and show the login form
  sessionStorage.removeItem('loggedIn'); // remove login status from session storage
  logoutForm.style.display = 'none';
  dataTable.style.display = 'none';
  loginForm.style.display = 'block';

  // reset the username and password fields
  const usernameField = document.getElementById('username');
  const passwordField = document.getElementById('password');
  usernameField.value = '';
  passwordField.value = '';
});

// check login status when the page loads
window.addEventListener('load', (event) => {
  const loggedIn = sessionStorage.getItem('loggedIn');
  if (loggedIn === 'true') {
    logoutForm.style.display = 'block';
    dataTable.style.display = 'block';
  } else {
    loginForm.style.display = 'block';
  }
});

// add a click event listener to the data table
dataTable.addEventListener('click', (event) => {
  const loggedIn = sessionStorage.getItem('loggedIn');
  if (loggedIn !== 'true') { // check login status
    alert('Please log in to modify the data.'); // show alert if not logged in
    event.preventDefault(); // prevent default behavior of the click event
  }
});