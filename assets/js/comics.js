class Comics {
    constructor(baseUrl = 'https://otruyenapi.com') {
        this.baseUrl = baseUrl;
    }

    async getComics() {
        const api = new FetchData(`${this.baseUrl}/v1/api`);
        api.get('/home').then(data => {
            const comics = data.data.items;
            return comics;
        }).catch(error => {
            console.error('GET error: ', error);
            return null;
        });
    }

    async renderComics(comics) {
        const comicList = document.querySelector('.comic-list');
        const utils = new Utils();

        comicList.innerHTML = comics.map(comic => {
            const chapter = comic.chaptersLatest?.[0]?.chapter_name || "Chưa có chương";
            return `<div class="comic">
                <img src="${this.baseUrl}/uploads/comics/${comic.thumb_url}" alt="Comic Image" class="comic-image">
                <span class="comic-updated">${utils.convertTimeAgo(comic.updatedAt)}</span>
                <div class="comic-info">
                    <span class="comic-name">${comic.name}</span>
                    <span class="comic-chapter">Chương ${chapter}</span>
                </div>
            </div>`
        }).join('');
    }

    renderComicSkeletons(limit) {
        const comicList = document.querySelector('.comic-list');

    }

    async renderSkeletons(count = 10) {
        const comicList = document.querySelector('.comic-list');
        comicList.innerHTML = Array.from({ length: count }).map(() => `
            <div class="comic-skeleton">
                <div class="skeleton skeleton-image"></div>
                <div class="skeleton-info">
                    <div class="skeleton skeleton-text"></div>
                    <div class="skeleton skeleton-text short"></div>
                </div>
            </div>
        `).join('');
    }
}