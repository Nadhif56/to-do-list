let taskInput = document.getElementById("task-input");
let addbutton = document.getElementById("add-button");
let taskList = document.getElementById("task-list");

// 1. Ambil data dari LocalStorage saat pertama kali dimuat. Jika kosong, gunakan array []
let tasks = JSON.parse(localStorage.getItem("myTasks")) || [];

function renderlist() {
   taskList.innerHTML = "";
   tasks.forEach((task, index) => {
      let li = document.createElement("li");
      li.innerText = task;

      let button = document.createElement("button");
      button.innerText = "delete";
      button.classList.add("delete-button");
      button.addEventListener("click", () => {
         deleteTask(index);
      });

      li.appendChild(button);
      taskList.appendChild(li);
   });
   
   // 2. Setiap kali list dirender (berubah), langsung simpan kondisi terbarunya ke LocalStorage
   saveToLocalStorage();
}

function addlist() {
   let task = taskInput.value.trim();
   if (task === "") {
      return; 
   }
   
   tasks.push(task);
   taskInput.value = ""; 
   renderlist(); // Di dalam sini otomatis memicu saveToLocalStorage()
}

function deleteTask(index) {
   tasks.splice(index, 1); 
   renderlist(); // Di dalam sini otomatis memicu saveToLocalStorage()
}

// 3. Fungsi pembantu untuk menyimpan array ke dalam teks di LocalStorage
function saveToLocalStorage() {
   localStorage.setItem("myTasks", JSON.stringify(tasks));
}

// Inisialisasi awal
renderlist();
addbutton.addEventListener("click", addlist);
taskInput.addEventListener("keypress", (tombol) => {
    if (tombol.key === "Enter") {
      addlist();
    }
});
