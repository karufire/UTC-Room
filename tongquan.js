// JavaScript riêng cho trang tongquan
window.renderPage=function(){
 setText('total-rooms',data.rooms.length);
 setText('today-schedules',data.schedule.filter(x=>x.date===new Date().toLocaleDateString('en-CA')).length);
 setText('total-equipment',data.equipment.reduce((s,x)=>s+(Number(x.quantity)||0),0));
 if($('#dashboard-room-list'))$('#dashboard-room-list').innerHTML=data.rooms.map(x=>`<tr>${['id','name','capacity','type','status'].map(k=>`<td>${esc(x[k])}</td>`).join('')}</tr>`).join('')||'<tr><td colspan="5">Chưa có phòng</td></tr>';
 if($('#room-statistics')){const counts={};data.rooms.forEach(x=>counts[x.status]=(counts[x.status]||0)+1);$('#room-statistics').innerHTML=Object.entries(counts).map(([k,v])=>`<div class="stat-line"><span>${esc(k)}</span><div class="progress"><div class="progress-bar" style="width:${v/data.rooms.length*100}%"></div></div><strong>${v}</strong></div>`).join('')||'Chưa có dữ liệu'}
};
render();
