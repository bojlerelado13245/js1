// frontend/app.js (grafikon nélkül)
const API_BASE = "http://localhost:4000/api";

function $(id) {
      return document.getElementById(id);
}

let token = localStorage.getItem("token") || null;
let userEmail = null;

// --- UI elemek ---
const loginBox = $("loginBox");
const registerBox = $("registerBox");
const authSection = $("auth");
const appArea = $("appArea");
const userbar = $("userbar");
const userEmailSpan = $("userEmail");

function setAuthUI(loggedIn) {
      if (loggedIn) {
            authSection.style.display = "none";
            appArea.style.display = "block";
            userbar.style.display = "block";
            userEmailSpan.textContent = userEmail || "";
      } else {
            authSection.style.display = "block";
            appArea.style.display = "none";
            userbar.style.display = "none";
      }
}

if (token) {
      try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            userEmail = payload.email;
      } catch (e) {}
      setAuthUI(true);
      fetchAll();
      fetchStats();
} else {
      setAuthUI(false);
}

// --- Auth actions ---
$("showRegister").addEventListener("click", (e) => {
      e.preventDefault();
      loginBox.style.display = "none";
      registerBox.style.display = "block";
});
$("showLogin").addEventListener("click", (e) => {
      e.preventDefault();
      registerBox.style.display = "none";
      loginBox.style.display = "block";
});

$("registerBtn").addEventListener("click", async () => {
      const email = $("regEmail").value;
      const password = $("regPassword").value;
      const res = await fetch(`${API_BASE}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
            $("regMsg").textContent = data.error || "Hiba";
      } else {
            $("regMsg").textContent = "Sikeres regisztráció, jelentkezz be!";
            registerBox.style.display = "none";
            loginBox.style.display = "block";
      }
});

$("loginBtn").addEventListener("click", async () => {
      const email = $("loginEmail").value;
      const password = $("loginPassword").value;
      const res = await fetch(`${API_BASE}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
            $("loginMsg").textContent = data.error || "Hiba";
      } else {
            token = data.token;
            localStorage.setItem("token", token);
            try {
                  userEmail = JSON.parse(atob(token.split(".")[1])).email;
            } catch (e) {}
            setAuthUI(true);
            $("loginMsg").textContent = "";
            fetchAll();
            fetchStats();
      }
});

$("logoutBtn").addEventListener("click", () => {
      token = null;
      localStorage.removeItem("token");
      setAuthUI(false);
});

// --- Workouts list and CRUD ---
async function fetchAll() {
      if (!token) return;
      const res = await fetch(`${API_BASE}/workouts`, {
            headers: { Authorization: "Bearer " + token },
      });
      if (!res.ok) {
            console.error("Failed to fetch workouts", await res.text());
            return;
      }
      const data = await res.json();
      renderWorkouts(data.workouts || []);
}

function renderWorkouts(workouts) {
      const ul = $("workoutList");
      ul.innerHTML = "";
      if (!workouts.length) {
            ul.innerHTML = "<li>Nincs edzés még</li>";
            return;
      }
      workouts.forEach((w) => {
            const li = document.createElement("li");
            li.className = "workoutItem";
            const left = document.createElement("div");
            left.innerHTML = `<strong>${w.date}</strong> — ${
                  w.duration
            } perc<br/><small>${w.notes || ""}</small>`;
            const right = document.createElement("div");
            const viewBtn = document.createElement("button");
            viewBtn.textContent = "Megnéz";
            const editBtn = document.createElement("button");
            editBtn.textContent = "Szerk.";
            const delBtn = document.createElement("button");
            delBtn.textContent = "Töröl";
            right.appendChild(viewBtn);
            right.appendChild(editBtn);
            right.appendChild(delBtn);
            li.appendChild(left);
            li.appendChild(right);
            ul.appendChild(li);

            viewBtn.addEventListener("click", () => {
                  const exList = (w.exercises || [])
                        .map(
                              (e) =>
                                    `${e.name} — ${e.sets || ""}x${
                                          e.reps || ""
                                    } @ ${e.weight || ""}`
                        )
                        .join("\n");
                  alert(`Gyakorlatok:\n${exList}`);
            });

            editBtn.addEventListener("click", () => {
                  $("editingId").value = w.id;
                  $("wDate").value = w.date;
                  $("wDuration").value = w.duration;
                  $("wNotes").value = w.notes || "";
                  const cont = $("exercisesContainer");
                  cont.querySelectorAll(".exerciseRow").forEach((el, idx) => {
                        if (idx === 0) {
                              el.querySelector(".exName").value =
                                    (w.exercises[0] && w.exercises[0].name) ||
                                    "";
                              el.querySelector(".exReps").value =
                                    (w.exercises[0] && w.exercises[0].reps) ||
                                    "";
                              el.querySelector(".exSets").value =
                                    (w.exercises[0] && w.exercises[0].sets) ||
                                    "";
                              el.querySelector(".exWeight").value =
                                    (w.exercises[0] && w.exercises[0].weight) ||
                                    "";
                        } else el.remove();
                  });
                  if (w.exercises && w.exercises.length > 1) {
                        for (let i = 1; i < w.exercises.length; i++) {
                              addExerciseRow(w.exercises[i]);
                        }
                  }
                  window.scrollTo(0, 0);
            });

            delBtn.addEventListener("click", async () => {
                  if (!confirm("Törlöd az edzést?")) return;
                  const res = await fetch(`${API_BASE}/workouts/${w.id}`, {
                        method: "DELETE",
                        headers: { Authorization: "Bearer " + token },
                  });
                  if (res.ok) {
                        fetchAll();
                        fetchStats();
                  } else {
                        alert("Törlés hiba");
                  }
            });
      });
}

// add / remove exercise row UI
function addExerciseRow(data = {}) {
      const cont = $("exercisesContainer");
      const div = document.createElement("div");
      div.className = "exerciseRow";
      div.innerHTML = `
    <input class="exName" placeholder="Név" value="${data.name || ""}" />
    <input class="exReps" placeholder="Reps" type="number" value="${
          data.reps || ""
    }" />
    <input class="exSets" placeholder="Sets" type="number" value="${
          data.sets || ""
    }" />
    <input class="exWeight" placeholder="Súly" type="number" step="0.1" value="${
          data.weight || ""
    }" />
    <button class="removeExBtn" type="button">-</button>
  `;
      cont.appendChild(div);
      div.querySelector(".removeExBtn").addEventListener("click", () =>
            div.remove()
      );
}
if (!document.querySelector(".exerciseRow")) addExerciseRow();

$("workoutForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      const id = $("editingId").value;
      const date = $("wDate").value;
      const duration = parseInt($("wDuration").value, 10);
      const notes = $("wNotes").value;
      const rows = Array.from(document.querySelectorAll(".exerciseRow"));
      const exercises = rows
            .map((r) => ({
                  name: r.querySelector(".exName").value,
                  reps: r.querySelector(".exReps").value
                        ? parseInt(r.querySelector(".exReps").value, 10)
                        : null,
                  sets: r.querySelector(".exSets").value
                        ? parseInt(r.querySelector(".exSets").value, 10)
                        : null,
                  weight: r.querySelector(".exWeight").value
                        ? parseFloat(r.querySelector(".exWeight").value)
                        : null,
            }))
            .filter((x) => x.name && x.name.trim().length > 0);

      const payload = { date, duration, notes, exercises };

      if (id) {
            const res = await fetch(`${API_BASE}/workouts/${id}`, {
                  method: "PUT",
                  headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                  },
                  body: JSON.stringify(payload),
            });
            if (res.ok) {
                  $("editingId").value = "";
                  $("workoutForm").reset();
                  document
                        .querySelectorAll(".exerciseRow")
                        .forEach((el, idx) => {
                              if (idx > 0) el.remove();
                        });
                  fetchAll();
                  fetchStats();
            } else {
                  alert("Szerkesztés hiba");
            }
      } else {
            const res = await fetch(`${API_BASE}/workouts`, {
                  method: "POST",
                  headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                  },
                  body: JSON.stringify(payload),
            });
            if (res.ok) {
                  $("workoutForm").reset();
                  document
                        .querySelectorAll(".exerciseRow")
                        .forEach((el, idx) => {
                              if (idx > 0) el.remove();
                        });
                  fetchAll();
                  fetchStats();
            } else {
                  alert("Hiba mentéskor");
            }
      }
});

// manual refresh
$("refreshBtn").addEventListener("click", () => {
      fetchAll();
      fetchStats();
});

// --- Stats (összes idő, grafikon nélkül) ---
async function fetchStats() {
      if (!token) return;
      const res = await fetch(`${API_BASE}/stats`, {
            headers: { Authorization: "Bearer " + token },
      });
      if (!res.ok) return;
      const data = await res.json();
      $("totalTime").textContent = data.total_minutes || 0;
}
