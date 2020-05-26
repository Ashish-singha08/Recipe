import {elements} from './base';

export const getInput = () => elements.searchInput.value;
export const clearInput = ()=>{
    elements.searchInput.value ='';
};
export const clearResult = ()=> {
    elements.searchResList.innerHTML= '';
    elements.searchResPage.innerHTML = '';
};

const reduceTitlelength = (title, limit=17) =>{
      
    const arr = [];
    if(title.length>limit){
        const my = title.split(' ');
       var sum =0;
        for(var i=0;i<my.length;i++){
            sum = sum + my[i].length;
            
            if(sum<=limit){
                 arr.push(my[i]);
            }
            
        }
        return `${arr.join(' ')}...`;
    }
    
    return title;
    
    
}
export const highlight = (id)=> {
    
    const arr = Array.from(document.querySelectorAll('.results__link'));
    arr.forEach(el=>{
        el.classList.remove('results__link--active');
    });
    
    document.querySelector(`.results__link[href="#${id}"]`).classList.add('results__link--active');
}
const renderRecipe = recipe => {
    const render = `<li>
                    <a class="results__link " href="#${recipe.recipe_id}">
                        <figure class="results__fig">
                            <img src="${recipe.image_url}" alt="Test">
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${reduceTitlelength(recipe.title)}</h4>
                            <p class="results__author">${recipe.publisher}</p>
                        </div>
                    </a>
                </li>`;
    elements.searchResList.insertAdjacentHTML('beforeEnd', render);
};

 
const createButton = (page,type)=> `
           <button class="btn-inline results__btn--${type}" data-goto="${type==='prev'?page-1:page+1}">
               <span>Page-${type==='prev'? page-1 : page+1 }</span>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-${type==='prev'?'left':'right'}"></use>
                    </svg>
                   
                </button>
`;

const renderButton = (page,numResults,resPerPage)=>{
    const noPages = Math.ceil(numResults/resPerPage);
 
    let button;
    if(page===1&&noPages>1){
        button = createButton(page,'next');
    }else if(page < noPages){
       button = `
       ${createButton(page,'prev')}
       ${createButton(page,'next')}
       `;
}else if(page === noPages && noPages>1){
    
      button = createButton(page,'prev'); 
    }
    
    elements.searchResPage.insertAdjacentHTML('afterbegin', button);
};

export const renderResults = (recipes, page=1,resPerPage=10) => {
    const length = recipes.length;
    
    const start = (page-1)*resPerPage;
    const end  = page*resPerPage;
   
   
    
   for( let i=start;(i<end&&i<recipes.length);i++){
       renderRecipe(recipes[i]);
   }
    
    renderButton(page,length,resPerPage);
};








