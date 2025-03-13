
export async function apiRequest(baseUrl, endpoint, options = {}) {
    try {
        const response = await fetch(`${baseUrl}${endpoint}`, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...options.headers,
            },
        });

        if (!response.ok) {
            throw new Error("HTTP error! Status:", response.status);
        }

        return await response.json();
    } catch (error) {
        console.error("API Request Error:", error);
        throw error;
    }
}
