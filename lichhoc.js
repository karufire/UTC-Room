// JavaScript riêng cho trang lichhoc
window.renderPage=()=>renderTable('schedule');
$('#add-schedule-btn')?.addEventListener('click',()=>edit('schedule'));
$('#schedule-search')?.addEventListener('input',render);
$('#schedule-date-filter')?.addEventListener('input',render);
render();
