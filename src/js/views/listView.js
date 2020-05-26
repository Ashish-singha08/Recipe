import {elements} from './base';

export const renderItem = item =>{
    const markup = `
<li class="shopping__item" data-id= "${item.id}">
                    <div class="shopping__count">
                        <input type="number" value="${item.count}" step="${item.count}" class = "count-input">
                        <p>${item.unit}</p>
                    </div>
                    <p class="shopping__description">${item.ingredient}</p>
                    <button class="shopping__delete btn-tiny">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-cross"></use>
                        </svg>
                    </button>
                </li>
`;
    
    elements.searchItem.insertAdjacentHTML('beforeend',markup);
};

export const deleteItem= id =>{
   const item =  document.querySelector(`[data-Id="${id}"]`);
    if(item) item.parentElement.removeChild(item);
};