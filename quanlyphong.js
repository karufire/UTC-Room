// JavaScript riêng cho trang quanlyphong
window.renderPage=()=>renderTable('rooms');
$('#add-room-btn')?.addEventListener('click',()=>edit('rooms'));
$('#room-search')?.addEventListener('input',render);
$('#room-filter')?.addEventListener('input',render);
render();
