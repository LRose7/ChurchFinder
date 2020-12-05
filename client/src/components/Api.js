const API_URL = '/churches/churchlist';

export async function listChurches() {
    const response = await fetch(`${API_URL}`);
    console.log(response);
    return response.json();
}

