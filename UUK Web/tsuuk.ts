// Mengambil elemen dari HTML
const taskInput = document.getElementById("task-input") as HTMLInputElement;
const addTaskBtn = document.getElementById("add-task-btn") as HTMLButtonElement;
const taskList = document.getElementById("task-list") as HTMLUListElement;
const emptyMessage = document.getElementById("empty-message") as HTMLParagraphElement;
const progressPercent = document.getElementById("progress-percent") as HTMLSpanElement;
const progressFill = document.getElementById("progress-fill") as HTMLDivElement;
const completedCount = document.getElementById("completed-count") as HTMLSpanElement;
const totalCount = document.getElementById("total-count") as HTMLSpanElement;

// Fungsi untuk memperbarui progress
function updateProgress(): void {
    const totalTasks = taskList.children.length;

    const completedTasks = taskList.querySelectorAll(
        ".task-checkbox:checked"
    ).length;

    let percentage = 0;

    if (totalTasks > 0) {
        percentage = Math.round((completedTasks / totalTasks) * 100);
    }

    progressPercent.textContent = percentage + "%";
    progressFill.style.width = percentage + "%";

    completedCount.textContent = completedTasks + " tasks completed";
    totalCount.textContent = totalTasks + " total tasks";
}

// Fungsi untuk menambahkan task
function addTask(): void {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    // Membuat kotak task
    const newTask = document.createElement("li");
    newTask.className = "task-item";

    // Membuat checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-checkbox";

    // Membuat nama task
    const taskName = document.createElement("span");
    taskName.className = "task-name";
    taskName.textContent = taskText;

    // Membuat tombol hapus
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.innerHTML = "&#128465;";
    deleteBtn.title = "Delete task";

    // Checklist: mencoret nama task ketika dicentang
    checkbox.addEventListener("change", function () {
        if (checkbox.checked) {
            taskName.classList.add("completed");
        } else {
            taskName.classList.remove("completed");
        }

        updateProgress();
    });

    // Menghapus task
    deleteBtn.addEventListener("click", function () {
        newTask.remove();

        if (taskList.children.length === 0) {
            emptyMessage.style.display = "block";
        }

        updateProgress();
    });

    // Memasukkan semua elemen ke dalam kotak task
    newTask.appendChild(checkbox);
    newTask.appendChild(taskName);
    newTask.appendChild(deleteBtn);

    // Menampilkan task
    taskList.appendChild(newTask);

    taskInput.value = "";
    emptyMessage.style.display = "none";

    updateProgress();
}

// Tombol Add Task
addTaskBtn.addEventListener("click", addTask);

// Menambahkan task dengan tombol Enter
taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});
