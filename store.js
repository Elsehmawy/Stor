document.addEventListener("DOMContentLoaded", function() {
  // تعريف العناصر
  let mny = document.getElementById("mny");
  let txt = document.getElementById("txt");
  let date = document.getElementById("date");
  let submit = document.getElementById("submit");
  let ddd = document.getElementById("ddd");

  // تحديد مفتاح فريد لهذا البرنامج في localStorage
  const storageKey = 'product_program_1';  // غير هذا المفتاح ليكون فريد لكل برنامج

  let dataPro;

  if (localStorage.getItem(storageKey)) {
    dataPro = JSON.parse(localStorage.getItem(storageKey));
  } else {
    dataPro = [];
  }

  // وظيفة الإضافة
  submit.addEventListener('click', function() {
    if (date.value === "" || txt.value === "" ) {
      alert("تأكد من ملء جميع الحقول قبل الإضافة.");
      return;
    }

    let newData = {
      date: date.value,
      txt: txt.value,
      mny: mny.value
    };

    dataPro.push(newData);
    localStorage.setItem(storageKey, JSON.stringify(dataPro));
    clear();
    showData();
  });

  // وظيفة مسح المدخلات
  function clear() {
    date.value = "";
    txt.value = '';
    mny.value = '';
  }

  // وظيفة عرض البيانات
  function showData() {
    let tble = '';
    for (var i = 0; i < dataPro.length; i++) {
      tble += `
        <tr>
          <td>${dataPro[i].date}</td>
          <td>${dataPro[i].txt}</td>
          <td>${dataPro[i].mny}</td>
          <td><button id ="edit"  onclick="editData(${i})">تعديل</button></td>
          <td><button id ="delet" onclick="deleteData(${i})">حذف</button></td>
        </tr>
      `;
    }
    document.getElementById('myTable').innerHTML = tble;
    toggleDeleteAllButton();
  }

  // عرض البيانات عند تحميل الصفحة
  showData();

  // وظيفة الحذف
  window.deleteData = function(index) {
    dataPro.splice(index, 1);
    localStorage.setItem(storageKey, JSON.stringify(dataPro));
    showData();
  };

  // وظيفة تعديل البيانات
  window.editData = function(index) {
    let row = document.getElementById("myTable").rows[index + 1]; // +1 لتجاهل رأس الجدول
    row.cells[0].innerHTML = `<input type="date" id="edit_date" value="${dataPro[index].date}">`;
    row.cells[1].innerHTML = `<input type="text" id="edit_txt" value="${dataPro[index].txt}">`;
    row.cells[2].innerHTML = `<input type="text" id="edit_mny" value="${dataPro[index].mny}">`;
    row.cells[3].innerHTML = `<button id ="save" onclick="saveData(${index})">حفظ</button>`;
  };

  window.saveData = function(index) {
    dataPro[index].date = document.getElementById("edit_date").value;
    dataPro[index].txt = document.getElementById("edit_txt").value;
    dataPro[index].mny = document.getElementById("edit_mny").value;
    localStorage.setItem(storageKey, JSON.stringify(dataPro));
    showData();
  };

  // وظيفة حذف الكل
  window.deleteAll = function() {
    dataPro = [];
    localStorage.removeItem(storageKey);
    showData();
  };

  // وظيفة عرض أو إخفاء زر حذف الكل
  function toggleDeleteAllButton() {
    let deleteAllContainer = document.getElementById('deleteAllContainer');
    if (dataPro.length > 0) {
      deleteAllContainer.innerHTML = `<button id ="deleteAll" onclick="deleteAll()">حذف الكل</button>`;
    } else {
      deleteAllContainer.innerHTML = "";
    }
  }

  // وظيفة الطباعة

  window.prnt = function() {
    no();
    window.print();
    ddd.style.display = "block";
    h1.style.display="block"
  };

  function no() {
    submit.style.display ="none"
    date.style.display = "none";
    txt.style.display = "none";
    mny.style.display = "none";
    prt.style.display = "none";
    let deleteButtons = document.querySelectorAll("#myTable button");
    deleteButtons.forEach(button => button.style.display = "none");
    document.getElementById('deleteAll').style.display = "none";
  }
});
