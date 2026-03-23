
// sort-drop down 
const sortbtn = document.querySelector("#sortButton");
const dropdown = document.querySelector(".dropdown-menu");

sortbtn.addEventListener("click", () => {
  dropdown.classList.toggle("hidden");
});

//mobile-drop down 
const mobileMenu = document.querySelector("#sidebar-toggle");
const hamburger = document.querySelector(".dropdown");

mobileMenu.addEventListener("click", () => {
  hamburger.classList.toggle("hidden");
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    mobileMenu.classList.add("hidden");
  }
});

// Q cards toggle open and close
const questions = document.querySelectorAll(".question");

questions.forEach(q => {
  const btn = q.querySelector(".question-btn");
  const answer = q.querySelector(".content");
  const icon = q.querySelector(".question-img");

  //Q card icon rotation
  btn.addEventListener("click", () => {
    answer.classList.toggle("hidden");
    icon.classList.toggle("rotate-180");
  });
});

//form
const addBtn = document.querySelector("#addtask");
const addTaskForm = document.querySelector("#addTask-form");
const taskForm = document.querySelector("#taskForm");
const taskContainer = document.querySelector("#task-container");
const taskNameInput = document.querySelector("#taskName");
const taskDescInput = document.querySelector("#taskDescription");
const piorityInput = document.querySelector("#piority");
const statusInput = document.querySelector("#taskStatus");
const dueDateInput = document.querySelector("#dueDate");
const cancelBtn = document.querySelector("#cancel");
 const closeBtn = document.querySelector(".formClose");

//pre built tasks
let tasks = [
  {
    id: 1,
    name: "Design homepage wireframe",
    desc: "Create low-fi wireframes for the new landing page.",
    piority: "high",
    status: "completed",
    date: "Jan 12, 2026"
  },
  {
    id: 2,
    name: "Write unit tests",
    desc: "Cover auth and payment modules with tests.",
    piority: "low",
    status: "completed",
    date: "Mar 01, 2026"
  },
  {
    id: 3,
    name: "Update dependencies",
    desc: "Bump all packages to latest stable versions",
    piority: "low",
    status: "completed",
    date: "Feb 20, 2026"
  },
  {
    id: 4,
    name: "Implement dark mode",
    desc: "Add theme toggle with CSS custom properties.",
    piority: "medium",
    status: "completed",
    date: "Feb 16, 2026"
  },
  {
    id: 5,
    name: "Set up CI/CD pipeline",
    desc: "Configure GitHub Actions for auto deploy.",
    piority: "medium",
    status: "completed",
    date: "Mar 09, 2026"
  },
  {
    id: 6,
    name: "Create user dashboard",
    desc: "Build the analytics dashboard for end users.",
    piority: "high",
    status: "in-progress",
    date: "Apr 04, 2026"
  },
  {
    id: 7,
    name: "Performance audit",
    desc: "Run Lighthouse and fix critical issues.",
    piority: "medium",
    status: "in-progress",
    date: "Mar 28, 2026"
  },
  {
    id: 8,
    name: "Fix login redirect bug",
    desc: "Users are redirected to 404 after OAuth login.",
    piority: "high",
    status: "completed",
    date: "Mar 03, 2026"
  },
  {
    id: 9,
    name: "Write API documentation",
    desc: "Document all REST endpoints with examples.",
    piority: "low",
    status: "todo",
    date: "Mar 30, 2026"
  },
]
//change priority tab colors
function renderTask(task) {
  const piorityColor = task.piority === "high" ? "bg-pink-100 text-pink-800"
    : task.piority === "medium" ? "bg-yellow-100 text-yellow-800"
      : "bg-green-100 text-green-700";

  //change status tab color    
  const statusColor = task.status === "todo" ? "bg-gray-100 text-gray-700"
    : task.status === "in-progress" ? "bg-blue-100 text-blue-700"
      : "bg-green-100 text-green-700";
  const card = document.createElement("div");
  card.classList.add("bg-white", "p-4", "rounded-xl", "shadow", "hover:shadow-lg", "transition-shadow");

  //change the status todo-> in_progress ->completed
  function statusChange(status) {
    if (status === "todo") return "in-progress";
    if (status === "in-progress") return "completed";
    return "todo";
  }
  //status change button mark in progress-> mark completed-> undo
  function progressChange(status) {
    if (status === "todo") return "Mark in Progress";
    if (status === "in-progress") return "Mark Completed";
    return "undo";
  }

  card.innerHTML = `
    <div class="flex justify-between items-center group">
      <h3 class="title font-bold text-gray-700 text-lg">${task.name}</h3>
      <button class="deleteBtn p-1 text-gray-800 hover:text-red-400 hover:bg-gray-100  opacity-0 rounded group-hover:opacity-100 transition-opacity">
        <svg class="h-3.5 w-3.5 " fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0">
           </path>
         </svg>
      </button>
    </div>
    <p class="text-sm text-gray-600 p-2 pl-0">${task.desc}</p>
    <span class="inline-flex items-center  border rounded-full px-2 py-0.5 ${piorityColor}">${task.piority}</span>
    <span class="status-tab inline-flex items-center  border rounded-full px-2 py-0.5 ${statusColor}">${task.status}</span>
    <div class="flex justify-between items-center mt-3 pt-3 border-t  border-thin">
      <p class=" text-sm text-gray-600">${task.date}</p>
      <button class="changePiority mt-3 p-1 text-sm text-gray-500 hover:bg-gray-200 ">${progressChange(task.status)}</button>
    </div>  
  `;

  //delete card
  const deleteBtn = card.querySelector(".deleteBtn");
  deleteBtn.addEventListener("click", () => {
    tasks = tasks.filter(t => t.id !== task.id);
    card.remove();
    updateCounts();

  });
  const changeBtn = card.querySelector(".changePiority");
  const statusChangebtn = card.querySelector(".status-tab");
  const title = card.querySelector(".title");

  changeBtn.addEventListener("click", () => {
    // Update count cards when status changes
    task.status = statusChange(task.status);
    updateCounts();

    // Update status tab text
    statusChangebtn.textContent = task.status;

    //Update status tab color
    const newColor = task.status === "todo" ? "bg-gray-100 text-gray-700"
      : task.status === "in-progress" ? "bg-blue-100 text-blue-700"
        : "bg-green-100 text-green-700";

    statusChangebtn.className = `status-badge inline-flex items-center border rounded-full px-2 py-0.5 ${newColor}`;

    // Update status change button text
    changeBtn.textContent = progressChange(task.status);

    if (task.status === "completed") {
      title.classList.add("line-through");
    } else {
      title.classList.remove("line-through");
    }
  });

  taskContainer.appendChild(card);
}
//tasks.forEach(renderTask);

// Show form
addBtn.addEventListener("click", () => addTaskForm.classList.remove("hidden"));

// Cancel button
cancelBtn.addEventListener("click", () => {
  addTaskForm.classList.add("hidden");
  taskForm.reset();
});
closeBtn.addEventListener("click", () => {
  addTaskForm.classList.add("hidden");
  taskForm.reset();
});

// Form submission
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newTask = {
    id: tasks.length + 1,
    name: taskNameInput.value,
    desc: taskDescInput.value,
    piority: piorityInput.value,
    status: statusInput.value,
    date: dueDateInput.value
  };
  tasks.push(newTask);
  renderTask(newTask);
  updateCounts();
  taskForm.reset();
  addTaskForm.classList.add("hidden");
});

const tabBtns = document.querySelectorAll(".tab-btn");

tabBtns.forEach(tab => {
  tab.addEventListener("click", () => {
    tabBtns.forEach(t => t.classList.remove("active", "border-b-2"));

    tab.classList.add("active", "border-b-2");

    const filter = tab.dataset.tab;

    taskContainer.innerHTML = "";

    // Filter tasks
    const filteredTasks = filter === "all" ? tasks
      : tasks.filter(task => {

        const status = task.status.toLowerCase();
        return status === filter;
      });

    // Render filtered tasks
    filteredTasks.forEach(renderTask);
  });
});

// sort tasks
const sortOptions = document.querySelectorAll(".sortOption");

sortOptions.forEach(option => {
  option.addEventListener("click", () => {
    const sortType = option.dataset.sort;

    tasks.sort((a, b) => {
      if (sortType === "date") return new Date(a.date) - new Date(b.date);
      if (sortType === "priority") {
        const order = { high: 1, medium: 2, low: 3 };
        return (order[a.piority.toLowerCase()]) - (order[b.piority.toLowerCase()]);
      }
      if (sortType === "name")
        if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;

    });

    // Clear container and render sorted tasks
    taskContainer.innerHTML = "";
    tasks.forEach(renderTask);

    // Hide dropdown
    dropdown.classList.add("hidden");
  });
});

//update count cards
function updateCounts() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.status === "completed").length;
  const progress = tasks.filter(t => t.status === "in-progress").length;
  const today = new Date();

  const overdue = tasks.filter(t => {
    const taskDate = new Date(t.date);
    return taskDate < today && t.status !== "completed";
  }).length;

  document.querySelector("#total").textContent = total;
  document.querySelector("#completed").textContent = completed;
  document.querySelector("#progress").textContent = progress;
  document.querySelector("#overdue").textContent = overdue;

}
tasks.forEach(renderTask); 
updateCounts();

//search by name OR description
const searchInput = document.querySelector("#search");

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();

// Filter tasks by name OR description
  const filteredTasks = tasks.filter(task =>
    task.name.toLowerCase().includes(query) || task.desc.toLowerCase().includes(query)
  );

// Clear container and render filtered tasks
  taskContainer.innerHTML = "";
  filteredTasks.forEach(renderTask);
});

