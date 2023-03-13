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

const loginForm = document.getElementById('login-form'); // 로그인 폼 가져오기
const logoutForm = document.getElementById('logout-form'); // 로그아웃 폼 가져오기
const dataTable = document.getElementById('data-table'); // 데이터 테이블 가져오기

// 로그인과 로그아웃 버튼 가져오기
const loginButton = document.getElementById('login-button');
const logoutButton = document.getElementById('logout-button');

// 로그인 버튼에 클릭 이벤트 리스너 추가
loginButton.addEventListener('click', (event) => {
  event.preventDefault(); // 기본 동작 방지

// 사용자 이름과 비밀번호 필드 가져오기
  const usernameField = document.getElementById('username');
  const passwordField = document.getElementById('password');

// 사용자 이름과 비밀번호 값 가져오기
  const username = usernameField.value;
  const password = passwordField.value;

// 서버에 로그인 자격 증명을 확인하는 요청 보내기
// 서버가 200 상태 코드를 포함한 성공적인 응답을 반환한다고 가정하면,
// 우리는 로그인 폼을 숨기고 로그아웃 폼과 데이터 테이블을 보여줄 것입니다.
  if (username === 'admin' && password === 'password') {
    sessionStorage.setItem('loggedIn', true); //로그인 상태를 세션 스토리지에 저장
    loginForm.style.display = 'none';
    logoutForm.style.display = 'block';
    dataTable.style.display = 'block';
    dataTable.style.margin = "0 auto"; 
  } else {
    alert('Invalid username or password.');
  }
});

// 로그아웃 버튼에 클릭 이벤트 리스너 추가
logoutButton.addEventListener('click', (event) => {
  event.preventDefault();

 // 로그아웃 폼과 데이터 테이블 숨기기, 로그인 폼 보이기
  sessionStorage.removeItem('loggedIn'); // remove login status from session storage
  logoutForm.style.display = 'none';
  dataTable.style.display = 'none';
  loginForm.style.display = 'block';

// 사용자 이름과 비밀번호 필드 재설정
  const usernameField = document.getElementById('username');
  const passwordField = document.getElementById('password');
  usernameField.value = '';
  passwordField.value = '';
});

// 페이지 로드 시 로그인 상태 확인
window.addEventListener('load', (event) => {
  const loggedIn = sessionStorage.getItem('loggedIn');
  if (loggedIn === 'true') {
    logoutForm.style.display = 'block';
    dataTable.style.display = 'block';
    dataTable.style.margin = "0 auto"; // center align the table
  } else {
    loginForm.style.display = 'block';
  }
});

// 클릭 이벤트 리스너를 데이터 테이블에 추가
dataTable.addEventListener('click', (event) => {
  const loggedIn = sessionStorage.getItem('loggedIn');
  if (loggedIn !== 'true') { // 로그인 상태 체크
    alert('Please log in to modify the data.'); 
    event.preventDefault(); // 기본 동작 방지
  }
});

// 클릭 이벤트 리스너를 로그인 양식에 추가하여 로그인을 시도할 때마다 필드를 재설정합니다
loginForm.addEventListener('click', (event) => {
  const usernameField = document.getElementById('username');
  const passwordField = document.getElementById('password');
  usernameField.value = '';
  passwordField.value = '';
});

// 테이블 모양 수정
// 내역 기능 정상화
// 새 기능 추가 (필요시)
// 기존 코드 정리
// 로그아웃 시 테이블 표시 안함 기능
// 아이템 검색 기능 추가 (검색창 및 중복 제거)
// 이벤트 리스너 정리
// Javascript deep dive 참고해서 문법 오류 수정
// id 별 데이터 테이블 서버저장
// 보안상 안전한 로그인 시스템 구현