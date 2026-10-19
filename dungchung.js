
// UTC Room: phiên bản nhiều trang, không có chức năng đặt phòng.
// Đăng nhập chỉ để minh họa phía trình duyệt, không phải bảo mật máy chủ.
const KEY='utc-room-demo-data-v1';
const initial={rooms:[{id:'A101',name:'Phòng A101',capacity:50,type:'Lý thuyết',location:'Tầng 1',status:'Sẵn sàng'},{id:'B202',name:'Phòng B202',capacity:35,type:'Máy tính',location:'Tầng 2',status:'Đang sử dụng'}],schedule:[],equipment:[]};
let data;
try { data=JSON.parse(localStorage.getItem(KEY))||structuredClone(initial); }
catch { data=structuredClone(initial); }
for(const k of Object.keys(initial))if(!Array.isArray(data[k]))data[k]=structuredClone(initial[k]);
let admin=sessionStorage.getItem('utc-admin-demo')==='yes';
const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const save=()=>localStorage.setItem(KEY,JSON.stringify(data));
function toast(msg){const t=$('#toast');if(!t)return;t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2500)}
const configs={
rooms:{fields:[['id','Mã phòng'],['name','Tên phòng'],['capacity','Sức chứa'],['type','Loại phòng'],['location','Vị trí'],['status','Trạng thái']],columns:['id','name','capacity','type','location','status'],target:'#room-list',prefix:'room'},
schedule:{fields:[['date','Ngày học (YYYY-MM-DD)'],['subject','Môn học'],['room','Mã phòng'],['teacher','Giảng viên'],['time','Thời gian'],['className','Lớp']],columns:['date','subject','room','teacher','time','className'],target:'#schedule-list',prefix:'schedule'},
equipment:{fields:[['name','Tên thiết bị'],['room','Mã phòng'],['quantity','Số lượng'],['status','Tình trạng']],columns:['name','room','quantity','status'],target:'#equipment-list',prefix:'equipment'}
};
function edit(kind,index=-1){
 if(!admin)return toast('Hãy đăng nhập Admin');
 const c=configs[kind];if(!c)return;
 const old=index<0?{}:data[kind][index],item={...old};
 for(const [key,label] of c.fields){const v=prompt(label,old[key]??'');if(v===null)return;if(!v.trim())return alert(label+' không được để trống');item[key]=v.trim()}
 if(kind==='rooms'&&data.rooms.some((r,i)=>i!==index&&r.id===item.id))return alert('Mã phòng đã tồn tại');
 if(index<0)data[kind].push(item);else data[kind][index]=item;
 save();render();toast('Đã lưu thay đổi trên trình duyệt');
}
function remove(kind,index){if(!admin)return;if(confirm('Bạn chắc chắn muốn xóa mục này?')){data[kind].splice(index,1);save();render();toast('Đã xóa')}}
function renderTable(kind){
 const c=configs[kind],target=$(c.target);if(!target)return;
 const search=$('#'+c.prefix+'-search')?.value.toLowerCase()||'';
 const filter=$('#'+c.prefix+'-filter')?.value||'';
 const date=$('#schedule-date-filter')?.value||'';
 const rows=data[kind].map((item,index)=>({item,index})).filter(({item})=>Object.values(item).join(' ').toLowerCase().includes(search)&&(!filter||item.status===filter)&&(kind!=='schedule'||!date||item.date===date));
 target.innerHTML=rows.length?rows.map(({item,index})=>`<tr>${c.columns.map(k=>`<td>${esc(item[k])}</td>`).join('')}<td class="admin-action"><button class="btn btn-small btn-edit" data-edit="${kind}" data-index="${index}">Sửa</button> <button class="btn btn-small btn-delete" data-delete="${kind}" data-index="${index}">Xóa</button></td></tr>`).join(''):`<tr><td colspan="${c.columns.length+1}" class="empty-row">Chưa có dữ liệu</td></tr>`;
}
function setText(id,value){const e=$('#'+id);if(e)e.textContent=value}
function render(){
  if(typeof window.renderPage==='function')window.renderPage();
  $$('.admin-action').forEach(el=>el.style.display=admin?'':'none');
  $$('[id^="add-"]').forEach(el=>el.style.display=admin?'':'none');
  if($('#export-report-btn'))$('#export-report-btn').style.display=admin?'':'none';
  setText('auth-btn',admin?'Đăng xuất':'Đăng nhập Admin');
  setText('auth-state',admin?'Quản trị viên':'Chế độ xem');
}
$('#auth-btn')?.addEventListener('click',()=>{
 if(admin){admin=false;sessionStorage.removeItem('utc-admin-demo');render();toast('Đã đăng xuất');return}
 $('#login-modal').hidden=false;$('#login-user').focus();
});
$('#login-close')?.addEventListener('click',()=>$('#login-modal').hidden=true);
$('#login-form')?.addEventListener('submit',e=>{
 e.preventDefault();
 if($('#login-user').value==='admin'&&$('#login-pass').value==='Admin@123'){
 admin=true;sessionStorage.setItem('utc-admin-demo','yes');$('#login-modal').hidden=true;$('#login-pass').value='';render();toast('Đăng nhập thành công');
 }else setText('login-error','Sai tài khoản hoặc mật khẩu');
});
document.addEventListener('click',e=>{
 const t=e.target.closest('[data-edit],[data-delete]');if(!t)return;
 if(t.dataset.edit)edit(t.dataset.edit,Number(t.dataset.index));
 if(t.dataset.delete)remove(t.dataset.delete,Number(t.dataset.index));
});

setText('today',new Date().toLocaleDateString('vi-VN'));
