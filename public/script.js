//registering user to database

// ==========================
// GLOBAL STATE
// ==========================
let currentPage = 1;
let totalPages = 1;
const limit = 5;
let currentSearch = "";
let currentSort = "desc";
// ==========================
// REGISTER
// ==========================
const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Registered successfully!");
      window.location.href = "login.html";
    } else {
      alert(data.message);
    }
  });
}

// ==========================
// LOGIN
// ==========================
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      window.location.href = "dashboard.html";
    } else {
      alert(data.message);
    }
  });
}

// ==========================
// LOAD NOTES (Dashboard)
// ==========================
const notesContainer = document.getElementById("notesContainer");

if (notesContainer) {
  loadNotes();
}

async function loadNotes() {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "login.html";
    return;
  }

 const res = await fetch(
  `/api/notes?page=${currentPage}&limit=${limit}&search=${currentSearch}&sort=${currentSort}`,
  {
    headers: { Authorization: `Bearer ${token}` },
  }
);

  const data = await res.json();
  const notes = data.notes;
  totalPages = data.pages;

  notesContainer.innerHTML = "";

  notes.forEach((note) => {
    const div = document.createElement("div");

    div.innerHTML = `
      <div id="note-${note._id}">
        <h4>${note.title}</h4>
        <p>${note.content}</p>
        <button onclick="enableEdit('${note._id}', '${note.title}', '${note.content}')">Edit</button>
        <button onclick="deleteNote('${note._id}')">Delete</button>
        <hr>
      </div>
    `;

    notesContainer.appendChild(div);
  });

  updatePaginationUI();
}

// ==========================
// PAGINATION CONTROLS
// ==========================
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageInfo = document.getElementById("pageInfo");

function updatePaginationUI() {
  if (!pageInfo) return;

  pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;

  if (prevBtn) prevBtn.disabled = currentPage === 1;
  if (nextBtn) nextBtn.disabled = currentPage === totalPages;
}

if (prevBtn && nextBtn) {
  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      loadNotes();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      loadNotes();
    }
  });
}
//Added Search & Sort Logic
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const sortSelect = document.getElementById("sortSelect");

if (searchBtn) {
  searchBtn.addEventListener("click", () => {
    currentSearch = searchInput.value.trim();
    currentPage = 1; // reset page when searching
    loadNotes();
  });
}

if (sortSelect) {
  sortSelect.addEventListener("change", () => {
    currentSort = sortSelect.value;
    currentPage = 1; // reset page when sorting changes
    loadNotes();
  });
}
// ==========================
// CREATE NOTE
// ==========================
const noteForm = document.getElementById("noteForm");

if (noteForm) {
  noteForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    const res = await fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, content }),
    });

    if (res.ok) {
      noteForm.reset();
      loadNotes();
    }
  });
}

// ==========================
// DELETE NOTE
// ==========================
async function deleteNote(noteId) {
  const token = localStorage.getItem("token");

  const res = await fetch(`/api/notes/${noteId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.ok) {
    loadNotes();
  } else {
    alert("Failed to delete note");
  }
}

// ==========================
// EDIT NOTE
// ==========================
function enableEdit(id, title, content) {
  const noteDiv = document.getElementById(`note-${id}`);

  noteDiv.innerHTML = `
    <input type="text" id="edit-title-${id}" value="${title}" /><br><br>
    <input type="text" id="edit-content-${id}" value="${content}" /><br><br>
    <button onclick="saveEdit('${id}')">Save</button>
    <button onclick="loadNotes()">Cancel</button>
    <hr>
  `;
}

async function saveEdit(id) {
  const token = localStorage.getItem("token");

  const newTitle = document.getElementById(`edit-title-${id}`).value;
  const newContent = document.getElementById(`edit-content-${id}`).value;

  const res = await fetch(`/api/notes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title: newTitle,
      content: newContent,
    }),
  });

  if (res.ok) {
    loadNotes();
  } else {
    alert("Failed to update note");
  }
}

// ==========================
// LOGOUT
// ==========================
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "login.html";
  });
}