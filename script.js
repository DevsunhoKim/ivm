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
    dataTable.style.display = 'none'; // hide the data table if not logged in
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
// 데이터 처리방식 구현


/*인증 및 승인: 웹페이지는 인벤토리 데이터에 대한 액세스 권한을 부여하기 전에 사용자가 자신을 인증하도록 요구해야 합니다. 또한 웹 페이지는 역할 기반 액세스 제어를 구현하여 인증된 사용자만 인벤토리에서 특정 작업을 수행할 수 있도록 해야 합니다.
암호화: 사용자 자격 증명 및 인벤토리 데이터와 같은 민감한 데이터는 무단 액세스를 방지하기 위해 강력한 암호화 알고리즘을 사용하여 암호화해야 합니다.
보안 통신: 웹 페이지는 도청 및 중간자 공격으로부터 보호하기 위해 HTTPS와 같은 보안 통신 프로토콜을 사용해야 합니다.
입력 유효성 검사: 웹 페이지는 SQL 주입 또는 XSS(교차 사이트 스크립팅)와 같은 주입 공격을 방지하기 위해 모든 사용자 입력의 유효성을 검사해야 합니다.
감사 로깅: 웹 페이지는 포렌식 조사 및 규정 준수 보고를 돕기 위해 로그인, 인벤토리 데이터 변경 및 기타 중요한 이벤트를 포함한 모든 사용자 활동에 대한 자세한 로그를 유지해야 합니다.
보안 업데이트: 알려진 취약점을 해결하기 위해 최신 보안 패치 및 업데이트로 웹 페이지를 정기적으로 업데이트해야 합니다.
정기적인 백업: 보안 위반이나 시스템 오류가 발생한 경우 데이터가 손실되지 않도록 인벤토리 데이터를 정기적으로 백업해야 합니다.*/

/*Oracle JET 프레임워크 설치: Oracle 웹 사이트에서 Oracle JET 프레임워크를 다운로드하여 설치할 수 있습니다.
Oracle 연결 만들기: Oracle 데이터베이스에 연결하려면 Oracle Instant Client를 사용하여 연결을 만들어야 합니다. Oracle 웹 사이트에서 Oracle Instant Client를 다운로드하여 설치할 수 있습니다. 일단 설치되면 Oracle 연결 문자열을 사용하여 데이터베이스에 연결할 수 있습니다.
데이터베이스 쿼리: JavaScript를 사용하여 데이터베이스에 액세스하는 RESTful API를 생성하여 Oracle 데이터베이스를 쿼리할 수 있습니다. Oracle JET 툴킷을 사용하여 JSON 데이터를 반환하는 RESTful 엔드포인트를 생성할 수 있습니다.
데이터 표시: 데이터베이스에서 데이터를 검색했으면 JavaScript를 사용하여 웹 애플리케이션에 데이터를 표시할 수 있습니다. HTML, CSS 및 JavaScript를 사용하여 읽을 수 있는 형식으로 데이터를 표시하는 사용자 인터페이스를 만들 수 있습니다.

전반적으로 프로세스에는 Oracle 데이터베이스에 연결하는 RESTful API 생성, JavaScript를 사용하여 데이터베이스 쿼리 및 사용자 친화적인 방식으로 데이터 표시가 포함됩니다.



/* 데이터 테이블 sql로 옮기기 11*/
// 오라클 모델 불러오기 실패

/*Python과 JavaScript를 연결하는 방법에는 여러 가지가 있습니다.

웹 API 사용: Flask 또는 Django와 같은 프레임워크를 사용하여 Python에서 웹 API를 만든 다음 JavaScript를 사용하여 XMLHttpRequest 개체 또는 가져오기 API를 사용하여 이 API에 요청을 보낼 수 있습니다. 그런 다음 API는 JavaScript에서 쉽게 사용할 수 있는 JSON 형식으로 데이터를 반환할 수 있습니다.
Python-to-JavaScript 컴파일러 사용: Pyodide 및 Transcrypt와 같은 도구를 사용하면 JavaScript로 컴파일할 수 있는 Python 코드를 작성할 수 있어 브라우저에서 Python 코드를 실행할 수 있습니다.
Node.js 사용: Node.js와 함께 서버 측에서 JavaScript를 사용하는 경우 하위 프로세스 또는 spawn을 사용하여 Python 스크립트를 실행하고 두 언어 간에 데이터를 전달할 수 있습니다.
Jupyter 노트북 사용: Jupyter 노트북을 사용하면 동일한 노트북에서 Python과 JavaScript 코드를 혼합할 수 있습니다. Python을 사용하여 데이터를 조작하고 시각화를 생성하고 JavaScript를 사용하여 대화형 사용자 인터페이스를 만들 수 있습니다.
전반적으로 접근 방식의 선택은 특정 사용 사례 및 요구 사항에 따라 다릅니다. */