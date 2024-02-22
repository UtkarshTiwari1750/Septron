// Api urls

const ProxyApi = "https://proxy.techzbots1.workers.dev/?u="
const IndexApi = "/home";
const recentapi = "/recent/";

// Api Server Manager

const AvailableServers = ['https://api1.anime-dex.workers.dev', 'https://api2.anime-dex.workers.dev', 'https://api3.anime-dex.workers.dev']

function getApiServer() {
    return AvailableServers[Math.floor(Math.random() * AvailableServers.length)]
}

// Usefull functions

async function getJson(path, errCount = 0) {
    const ApiServer = getApiServer();
    let url = ApiServer + path;


    if (errCount > 2) {
        throw `Too many errors while fetching ${url}`;
    }

    if (errCount > 0) {
        // Retry fetch using proxy
        console.log("Retrying fetch using proxy");
        url = ProxyApi + url;
    }

    try {
        const response = await fetch(url);
        return await response.json();
    } catch (errors) {
        console.error(errors);
        return getJson(path, errCount + 1);
    }
}

function genresToString(genres) {
    return genres.join(", ");
}

function shuffle(array) {
    let currentIndex = array.length,
        randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }

    return array;
}

async function RefreshLazyLoader() {
    const imageObserver = new IntersectionObserver((entries, imgObserver) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const lazyImage = entry.target;
                lazyImage.src = lazyImage.dataset.src;
            }
        });
    });
    const arr = document.querySelectorAll("img.lzy_img");
    arr.forEach((v) => {
        imageObserver.observe(v);
    });
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// To load more animes when scrolled to bottom
let page = 2;
let isLoading = false;

async function loadAnimes() {
    try {
        if (isLoading == false) {
            isLoading = true;
            RefreshLazyLoader();
            console.log("Recent animes loaded");
            page += 1;
            isLoading = false;
        }
    } catch (error) {
        isLoading = false;
        console.error(`Failed To Load Recent Animes Page : ${page}`);
        page += 1;
    }
}

// Add a scroll event listener
window.addEventListener('scroll', function () {
    // Calculate how far the user has scrolled
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if ((scrollPosition + (3 * windowHeight)) >= documentHeight) {
        loadAnimes();
    }
});


// Running functions

exports.popularAndTrendingAnime = async() => {
    let animes = {};
    let data = await getJson(IndexApi);

    data = data["results"];
    const anilistTrending = shuffle(data["anilistTrending"]);
    const gogoanimePopular = shuffle(data["gogoPopular"]);

    animes = {
        'Popular':gogoanimePopular,
        'Trending': anilistTrending
    }
    return animes;
}
