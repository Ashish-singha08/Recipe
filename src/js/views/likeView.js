import {elements} from './base';

export const toggleButton = isLiked => {
    
    const iconString = isLiked ?'icon-heart':'icon-heart-outlined';
    document.querySelector('.recipe__love use').setAttribute('href',`img/icons.svg#${iconString}`);
    
};
export const toggleLikesButton = numLikes => {
    elements.likesMenu.style.visibility = numLikes>0?'visible':'hidden';
};
export const renderLike = item =>{
    const markUp = `
       <li>
                            <a class="likes__link" href="#${item.id}">
                                <figure class="likes__fig">
                                    <img src="${item.img}" alt="${item.title}">
                                </figure>
                                <div class="likes__data">
                                    <h4 class="likes__name">${item.title}</h4>
                                    <p class="likes__author">${item.author}</p>
                                </div>
                            </a>
                        </li>
`;
    elements.likesList.insertAdjacentHTML('beforeend',markUp);
}
export const deleteLike = id =>{
    const temp = document.querySelector(`.likes__link[href= "#${id}"]`).parentElement;
    if(temp)temp.parentElement.removeChild(temp);
};