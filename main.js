const gifContainer = document.querySelector('#gif-container');
const currentThemes = ['trending', 'happy', 'surprised', 'sad', 'wow', 'angry', 'why'];
let currSelectedTheme = 'trending';

const init = () => {
    const searchBar = document.querySelector('#search-bar');
    const themeTabsContainer = document.querySelector('#tabs-container');

    // Event listner for search bar 
    searchBar.addEventListener('input', (e) => {
        searchBarChangeHandler(e);
    });

    // Create theme tabs and append them to themeTabsContainer 
    for (i = 0; i < currentThemes.length; i++) {
        const tab = document.createElement('button');
        tab.setAttribute('class', 'theme-tab');
        tab.innerHTML = currentThemes[i];
        tab.addEventListener('click', (e) => {
            tabSelectionHandler(e);
        });
        themeTabsContainer.append(tab);
    }

    // Automatically display trending gifs initially
    getGifUrls('trending');
}

const searchBarChangeHandler = (e) => {
    e.preventDefault();
    getGifUrls(e.target.value);
}

const tabSelectionHandler = (e) => {
    e.preventDefault();
    const selectedTheme = e.target.innerHTML;
    if (selectedTheme != currSelectedTheme) {
        currSelectedTheme = selectedTheme;
        while (gifContainer.firstChild) {
            gifContainer.firstChild.remove();
        }
        getGifUrls(selectedTheme);
    }
}

const getGifUrls = async (currentInput) => {
    const giphyRoot = 'https://api.giphy.com/v1/gifs/';
    const giphyKeyLimitQuery = `api_key=${key}&limit=10`;
    let query;
    currentInput === 'trending' 
        ? query = `${giphyRoot}${currentInput}?${giphyKeyLimitQuery}`
        : query = `${giphyRoot}search?q=${currentInput}&${giphyKeyLimitQuery}`;
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
