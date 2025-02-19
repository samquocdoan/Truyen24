class FetchData {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async request(endpoint, method = 'GET', data = null, headers = {}) {
        try {
            const options = {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    ...headers
                }
            };

            if (data) {
                options.body = JSON.stringify(data);
            }

            const response = await fetch(`${this.baseUrl}${endpoint}`, options);
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
            }

            return await response.json();
        } catch (e) {
            console.error('Fetch error: ', e);
            throw e;
        }
    }

    async get(endpoint, headers = {}) {
        return this.request(endpoint, 'GET', null, headers);
    }

    async post(endpoint, data, headers = {}) {
        return this.request(endpoint, 'POST', data, headers);
    }

    async put(endpoint, data, headers = {}) {
        return this.request(endpoint, 'PUT', data, headers);
    }

    async delete(endpoint, headers = {}) {
        return this.request(endpoint, 'DELETE', null, headers);
    }
}

class Utils {
    convertTimeAgo(isoDate) {
        const now = new Date();
        const updatedTime = new Date(isoDate);
        const diffInSeconds = Math.floor((now - updatedTime) / 1000);

        const intervals = [
            { label: 'năm', seconds: 31536000 },
            { label: 'tháng', seconds: 2592000 },
            { label: 'tuần', seconds: 604800 },
            { label: 'ngày', seconds: 86400 },
            { label: 'giờ', seconds: 3600 },
            { label: 'phút', seconds: 60 },
            { label: 'giây', seconds: 1 }
        ];

        for (const interval of intervals) {
            const count = Math.floor(diffInSeconds / interval.seconds);
            if (count >= 1) {
                return `${count} ${interval.label} trước`; 
            }
        }
        return 'Vừa xong';
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const menuBtn = document.querySelector(".menu-btn");
    const menuModal = document.querySelector(".menu-modal");

    menuBtn.addEventListener("click", function () {
        menuModal.classList.toggle("active");
    });

    document.addEventListener("click", function (event) {
        if (!menuModal.contains(event.target) && !menuBtn.contains(event.target)) {
            menuModal.classList.remove("active");
        }
    });
});
