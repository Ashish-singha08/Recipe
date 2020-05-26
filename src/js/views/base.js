export const elements ={
    searchForm : document.querySelector('.search'),
    searchInput : document.querySelector('.search__field'),
    searchResList: document.querySelector('.results__list'),
    searchLoader: document.querySelector('.results'),
    searchResPage : document.querySelector('.results__pages'),
    searchRecipe : document.querySelector('.recipe'),
    searchItem: document.querySelector('.shopping__list'),
    likesMenu : document.querySelector('.likes__field'),
    likesList : document.querySelector('.likes__list')
   
};

const elementString = {
    loader: 'loader'
}
export const renderLoader = parent => {
   
    const loader = `
<div class="${elementString.loader}">
<svg>
  <use href ="img/icons.svg#icon-cw"></use>
</svg>
</div>`;
    
    parent.insertAdjacentHTML('afterbegin', loader);
};

export const closeRender = () => {
    const render =  document.querySelector(`.${elementString.loader}`);
    if(render)
        render.parentElement.removeChild(render);
}