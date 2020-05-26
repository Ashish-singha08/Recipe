import Search from './models/Search';
import {elements,renderLoader,closeRender} from './views/base';
import * as searchView from './views/searchView';
import Recipe from './models/recipe';
import * as recipeView from './views/recipeView';
import List from './models/list';
import * as listView from './views/listView'; 
import Likes from './models/like';
import * as likeView from './views/likeView';
const state= {};

const controlSearch = async () => {
    const query =  searchView.getInput();//1. to get it from view
    
    if(query){
        //2. new search object and add it to state
        state.search = new Search(query);
        //3. prepare UI for results
        searchView.clearInput();
        searchView.clearResult();
        renderLoader(elements.searchLoader);
        
        try{
            // 4. search for recipe
         
            await state.search.getResults();
        }catch (error){
            alert('search went wrong!');
            closeRender();
        }
        //5. render results on UI
        closeRender();
        
        searchView.renderResults(state.search.result);
    }
}

elements.searchForm.addEventListener('submit',e =>{
   
    e.preventDefault();
    controlSearch();
    
});
elements.searchResPage.addEventListener('click',e=>{
   const btn = e.target.closest('.btn-inline');
    
    if(btn){
        const goToPages = parseInt(btn.dataset.goto,10);
        
        searchView.clearResult();
        searchView.renderResults(state.search.result,goToPages);
    }
    
});

/*
**RECiPE MODEL
**
*/

const controlRecipe = async () => {
    const id = window.location.hash.replace('#','');
    console.log(id);
    
    if(id){
        //prepare UI for recipe
        
        recipeView.clearRecipe();
        renderLoader(elements.searchRecipe);
        
        //create a new object of recipe
        
        state.recipe = new Recipe(id);
        
       if(state.search) searchView.highlight(id);
        //window.r = new Recipe(id);
        try{
            
            //get recipe data
            
         await state.recipe.getRecipe();
           // console.log(state.recipe.ingredients);
         }catch(error){
            
            alert('something went wrong!');
            closeRender();
        }
            //calculate serving and time
       
            state.recipe.calServings();
            state.recipe.parseIngredients();
      //render recipe
        closeRender();
    recipeView.renderRecipe(state.recipe,state.like.isLiked(id));
        
       
    }
}

window.addEventListener('hashchange',controlRecipe);
window.addEventListener('load',controlRecipe);

/*
* LIST CONTROLLER
*/

elements.searchItem.addEventListener('click',el2 =>{
  const any = el2.target.closest('.shopping__item');
      
  const num = any.dataset.id; 
    
    if(el2.target.matches('.shopping__delete , .shopping__delete *')){
        listView.deleteItem(num);
        state.list.deleteItem(num);
    }
    else if(el2.target.matches('.count-input')){
        const val = parseFloat(el2.target.value,10);
        console.log(val);
        state.list.updateCount(num,val);
        
        console.log(state.list);
    }
});

/*
* LIKE CONTROLLER
*/
const controlLike=()=>{
    if(!state.like) state.like = new Likes();
    const curId = state.recipe.id;
  
    if(!state.like.isLiked(curId)){
        //ADD LIKE TO THE STATE
        
        const likeItem = state.like.addLikeItem(curId,state.recipe.title,state.recipe.author,state.recipe.img);
        
        //TOGGLE THE BUTTON
        likeView.toggleButton(true);
        //UPDATE ui LIST
        likeView.renderLike(likeItem);
       // console.log(likeItem);
    }else {
        likeView.toggleButton(false);
        state.like.deleteLike(curId);
       // console.log(state.like);
        likeView.deleteLike(curId);
        
    }
    likeView.toggleLikesButton(state.like.getNumLikes());
}

window.addEventListener('load',()=>{
   
    state.like = new Likes();
    state.like.readStorage();
likeView.toggleLikesButton(state.like.getNumLikes());
    for(let i=0;i<state.like.likes.length;i++){
        likeView.renderLike(state.like.likes[i]);
    }
    
});





const controlItem=()=>{
    if(!state.list)state.list = new List();
    
    state.recipe.ingredients.forEach(el=>{
         const temp =state.list.addItem(el.count,el.unit,el.ingr);
       
        listView.renderItem(temp);
        
    });
     console.log(state.list);
}

elements.searchRecipe.addEventListener('click' ,el => {
      if(el.target.matches('.btn-decrease, .btn-decrease *')) {
          
         if(state.recipe.servings>1) state.recipe.updatesIng('dec');
          recipeView.updateIng(state.recipe);
          
      }   else if (el.target.matches('.btn-increase, .btn-increase *')){
          
          state.recipe.updatesIng('inc');
          recipeView.updateIng(state.recipe);
      }                             
        else if (el.target.matches('.recipe__btn-add, .recipe__btn--add *')){
            controlItem();
        } else if (el.target.matches('.recipe__love, .recipe__love *')){
            controlLike();
        }
});





