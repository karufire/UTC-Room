// JavaScript riêng cho trang thietbi
window.renderPage=()=>renderTable('equipment');
$('#add-equipment-btn')?.addEventListener('click',()=>edit('equipment'));
$('#equipment-search')?.addEventListener('input',render);
$('#equipment-filter')?.addEventListener('input',render);
render();
