const searchBar = document.querySelector('#search-bar');
const themeTabsContainer = document.querySelector('#tabs-container');
const gifContainer = document.querySelector('#gif-container');

const giphyRoot = 'https://api.giphy.com/v1/gifs/';
const currentThemes = ['trending', 'happy', 'surprised', 'sad', 'wow', 'angry', 'why'];

const init = () => {
    // Event listner for search bar 
    searchBar.addEventListener('input', (e) => {
        searchBarChangeHandler(e);
    });

    // Create theme tabs and append them to themeTabsContainer 
    for (i = 0; i < currentThemes.length; i++) {
        const currentTab = document.createElement('button');
        currentTab.setAttribute('class', 'theme-tab');
        currentTab.innerHTML = currentThemes[i];
        currentTab.addEventListener('click', (e) => {
            tabSelectionHandler(e);
        });
        themeTabsContainer.append(currentTab);
    }
}

const searchBarChangeHandler = (e) => {
    e.preventDefault();
    getGifUrls(e.target.value);
}

const tabSelectionHandler = (e) => {
    getGifUrls(e.target.innerHTML);
}

const getGifUrls = async (currentInput) => {
    const query = `${giphyRoot}search?q=${currentInput}&api_key=${key}&limit=2`;
    const queryResult = await fetch(query).then((res) => res.json());
    // console.log(queryResult)
    for (i = 0; i < queryResult.data.length; i++) {
        updateDisplayedGif(queryResult.data[i].images.fixed_width_downsampled.url);
    }
}

const updateDisplayedGif = (url) => {
    const gif = document.createElement('img');
    gif.setAttribute('class', 'gif');
    gif.setAttribute('src', url);
    gifContainer.append(gif);
}

init();
