// JavaScript riêng cho trang baocao
window.renderPage=function(){
 setText('report-rooms',data.rooms.length);
 setText('report-schedules',data.schedule.length);
 setText('report-equipment',data.equipment.reduce((s,x)=>s+(Number(x.quantity)||0),0));
};
$('#export-report-btn')?.addEventListener('click',()=>{
 const csv='Loại,Số lượng\nPhòng,'+data.rooms.length+'\nLịch học,'+data.schedule.length+'\nThiết bị,'+data.equipment.length;
 const a=document.createElement('a'),url=URL.createObjectURL(new Blob(['\ufeff'+csv],{type:'text/csv;charset=utf-8'}));
 a.href=url;a.download='bao-cao-utc-room.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
});
render();
