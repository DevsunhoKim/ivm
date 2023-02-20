// 재고 테이블 및 양식 가져오기
const inventoryTable = document.querySelector('#inventory tbody');
const addItemForm = document.querySelector('#add-item-form');
const exportBtn = document.querySelector('#export-btn');

// localStorage에서 인벤토리 로드
let inventory = JSON.parse(localStorage.getItem('inventory')) || [];

// 테이블에 인벤토리 렌더링
renderInventory();

// 인벤토리에 새 항목 추가
addItemForm.addEventListener('submit', (event) => {
	event.preventDefault();
	const itemName = document.querySelector('#item-name').value;
	let itemQuantity = parseInt(document.querySelector('#item-quantity').value);
	const itemPrice = parseFloat(document.querySelector('#item-price').value);

	if (isNaN(itemQuantity) || itemQuantity < 1) {
        alert("수량은 1 이상의 수를 입력해야 합니다.");
        return;
	}

	// 인벤토리에 새 항목 추가
	inventory.push({ name: itemName, quantity: itemQuantity, price: itemPrice });

	// 업데이트된 인벤토리를 localStorage에 저장합니다
	localStorage.setItem('inventory', JSON.stringify(inventory));

	// 테이블에서 업데이트된 인벤토리 렌더링
	renderInventory();

	// 양식 재설정
	addItemForm.reset();
});

exportBtn.addEventListener('click', () => {
	// 새 Excel 워크북 만들기
	const workbook = XLSX.utils.book_new();

	// 새 워크시트 생성
	const worksheet = XLSX.utils.json_to_sheet(inventory);

	// 워크북에 워크시트 추가
	XLSX.utils.book_append_sheet(workbook, worksheet, 'Inventory');

	// 현재 날짜를 이용하여 파일명 생성
	const date = new Date();
	const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
	const fileName = `inventory_${dateString}.xlsx`;

	// 워크북을 Excel 파일로 내보내기
	XLSX.writeFile(workbook, fileName);
});

// 테이블에 인벤토리 렌더링
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

// 테이블에 인벤토리 렌더링
function renderInventory() {
	inventoryTable.innerHTML = '';
	inventory.forEach((item, index) => {
	  const row = document.createElement('tr');
	  row.innerHTML = `
		<td>${item.name}</td>
		<td>${item.quantity}</td>
		<td>$${item.price.toFixed(2)}</td>
		<td><button class="delete-btn">삭제</button></td>
	  `;
	  inventoryTable.appendChild(row);
	});
  
	// 삭제 버튼에 이벤트 리스너 추가
	const deleteButtons = document.querySelectorAll('.delete-btn');
	deleteButtons.forEach((button, index) => {
	  button.addEventListener('click', () => {
		inventory.splice(index, 1);
		localStorage.setItem('inventory', JSON.stringify(inventory));
		renderInventory();
	  });
	});
  }