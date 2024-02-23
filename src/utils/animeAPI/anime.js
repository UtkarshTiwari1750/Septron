// Api urls

const ProxyApi = "https://proxy.techzbots1.workers.dev/?u="
const animeapi = "/anime/";
const recommendationsapi = "/recommendations/";

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


// Function to get anime info from gogo id
async function loadAnimeFromGogo(data) {
    const anime_title = data["name"];

    console.log("Anime Info loaded");
    RefreshLazyLoader();

    await getRecommendations(anime_title)
}

// Function to get anime recommendations
async function getRecommendations(anime_title) {

    anime_title = anime_title.replaceAll(" ", "+");

    let data;
    try {
        data = await getJson(recommendationsapi + anime_title);
    }
    catch (err) {
        console.log("error anime...", err)
        return
    }

    const recommendations = data["results"];

    RefreshLazyLoader();
}

const animeId = window.location.pathname;
let urlParams;
if(animeId){
    urlParams = animeId.split("/")[2];
}

//Running functions
exports.loadData = async() => {
    try {
        let data = await getJson(animeapi + urlParams);
        data = data["results"];

        if (data.source == "gogoanime") {
            loadAnimeFromGogo(data);
        }
        RefreshLazyLoader();
        return data;
    } catch (err) {
        console.error(err);
    }
}