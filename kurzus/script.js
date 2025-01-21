const apiUrl = 'https://vvri.pythonanywhere.com/api/courses';

// Meglévő kurzusok megjelenítése
function showCourses() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            let content = '<h2>Kurzusok</h2>';
            data.forEach(course => {
                content += `
                    <div>
                        <h3>${course.name}</h3>
                        <p>${course.description}</p>
                        <button onclick="editCourse(${course.id})">Szerkesztés</button>
                        <button onclick="deleteCourse(${course.id})">Törlés</button>
                    </div>
                `;
            });
            content += `<button onclick="addCourse()">Új kurzus hozzáadása</button>`;
            document.getElementById('content').innerHTML = content;
        });
}


function addCourse() {
    document.getElementById('form').innerHTML = `
        <h2>Új kurzus hozzáadása</h2>
        <form onsubmit="submitCourse(event)">
            <input type="text" id="courseName" placeholder="Kurzus neve" required>
            <textarea id="courseDescription" placeholder="Kurzus leírása" required></textarea>
            <button type="submit">Mentés</button>
        </form>
    `;
}

function submitCourse(event) {
    event.preventDefault();
    const name = document.getElementById('courseName').value;
    const description = document.getElementById('courseDescription').value;

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, description })
    })
    .then(() => {
        showCourses();
        document.getElementById('form').innerHTML = '';
    });
}


function editCourse(id) {
    fetch(`${apiUrl}/${id}`)
        .then(response => response.json())
        .then(course => {
            document.getElementById('form').innerHTML = `
                <h2>Kurzus szerkesztése</h2>
                <form onsubmit="updateCourse(event, ${id})">
                    <input type="text" id="courseName" value="${course.name}" required>
                    <textarea id="courseDescription" required>${course.description}</textarea>
                    <button type="submit">Mentés</button>
                </form>
            `;
        });
}

function updateCourse(event, id) {
    event.preventDefault();
    const name = document.getElementById('courseName').value;
    const description = document.getElementById('courseDescription').value;

    fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, description })
    })
    .then(() => {
        showCourses();
        document.getElementById('form').innerHTML = '';
    });
}


function deleteCourse(id) {
    fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    })
    .then(() => showCourses());
}


function showStudents() {
    let content = '<h2>Diákok</h2>';
    content += '<p>A diákok adatai itt jelennek meg.</p>';
    document.getElementById('content').innerHTML = content;
}
