async function fetchUserInfo(username) {
    const response = await fetch(`https://www.codewars.com/api/v1/users/${username}`);
    
    if (!response.ok) {
        alert('Hiba történt. Kérlek, ellenőrizd a felhasználónevet.');
        return null;
    }
    
    return await response.json();
}

function addUser() {
    const username = document.getElementById('username').value;
    if (username) {
        const url = new URL(window.location);
        url.searchParams.set('user', username);
        window.history.pushState({}, '', url);
        displayUser(username);
    }
}

async function displayUser(username) {
    const data = await fetchUserInfo(username);
    if (data) {
        const languages = Object.keys(data.ranks.languages).join(', ');
        const cardHtml = `
            <div class="card">
                <h2>${data.username}</h2>
                <p>Név: ${data.name || 'N/A'}</p>
                <p>Klán: ${data.clan || 'N/A'}</p>
                <p>Nyelvek: ${languages}</p>
                <p>JavaScript: ${data.ranks.languages.javascript.name || 'N/A'}</p>
                <p>Kyu: ${data.ranks.overall.name}</p>
            </div>
        `;
        document.getElementById('cards').innerHTML += cardHtml;
    }
}

window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('user');
    if (username) {
        displayUser(username);
    }
};
