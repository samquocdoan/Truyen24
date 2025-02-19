class Home {
    constructor(baseUrl) {
        this.baseUrl = baseUrl
    }

    async init() {
        const api = new FetchData('https://otruyenapi.com/v1/api/');
        api.get('home').then(data => {
            console.log(data.data.seoOnPage.og_image);
        }).catch(error => {
            console.error('GET error: ', error);
        });
    }

    async getComics() {
        const api = new FetchData('https://otruyenapi.com/v1/api/');
        api.get('home').then(data => {
            const comics = data.data.items;
            this.renderComics(comics);
        }).catch(error => {
            console.error('GET error: ', error);
        });
    }

    async renderComics(comics) {
        const comicList = document.querySelector('.comic-list');
        const utils = new Utils();

        comicList.innerHTML = comics.map(comic => {
            const chapter = comic.chaptersLatest?.[0]?.chapter_name || "Chưa có chương";
            return `<div class="comic">
                <img src="${this.baseUrl}${comic.thumb_url}" alt="Comic Image" class="comic-image">
                <span class="comic-updated">${utils.convertTimeAgo(comic.updatedAt)}</span>
                <div class="comic-info">
                    <span class="comic-name">${comic.name}</span>
                    <span class="comic-chapter">Chương ${chapter}</span>
                </div>
            </div>`
        }).join('');
    }
}

document.addEventListener('DOMContentLoaded', async function (event) {
    const home = new Home('https://otruyenapi.com/uploads/comics/');
    const comics = new Comics();
    comics.renderSkeletons();
    await home.getComics();
});