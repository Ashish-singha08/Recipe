import axios from 'axios';
export default class Recipe{
    constructor(id){
        this.id =id;
    }
    async getRecipe(){
        try{
            const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.author= res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
           this.time = ((this.ingredients.length)/3)*15;
          
        }
        catch(error){
            alert('something went wrong:)');
        }
    }
    
   parseIngredients(){
      const longUnit = ['tablespoons','tablespoon','ounces','ounce','teaspoons','teaspoon','cups'];
       const shortUnit = ['tbsp','tbsp','oz','oz','tsp','tsp','cup','kg','g'];
      
       
       const newIngredients = this.ingredients.map(el => {
          let ing = el.toLowerCase();
           // to replace lonng units withj short units
           
           for(let i =0; i<longUnit.length;i++){
              
                 
                   ing = ing.replace(longUnit[i],shortUnit[i]);
             
           }
           //TO REPLACE () IN INGRDIENTS
           
           ing = ing.replace(/ *\([^)]*\) */g,' ');
           //
           
           let ingobj;
           
           const ingArr = ing.split(' ');
           const unitIndex = ingArr.findIndex(el2 => shortUnit.includes(el2));
           
           if(unitIndex>-1){
               
               const arr = ingArr.slice(0,unitIndex);
               let count;
               if(arr.length ===1){
                   count = eval(arr[0].replace('-','+'));
               }else{
                   count = eval(arr.join('+'));
               }
               
               ingobj = {
                   count,
                   unit: ingArr[unitIndex],
                   ingr: ingArr.slice(unitIndex+1).join(' ')
               }
               
               
               
           }else if(parseInt(ingArr[0],10)){
               
               ingobj = {
                   count: parseInt(ingArr[0],10),
                   unit: '',
                   ingr: ingArr.splice(1).join(' ')
               }
               
           }else if(unitIndex===-1){
               ingobj={
                   count: '',
                   unit : '',
                   ingr : ingArr.join(' ')
               }
           }
           return ingobj;
       });
       this.ingredients = newIngredients;
   }
    calServings(){
        this.servings = 4;
    }
    
    updatesIng(type){
        const newSer = (type === 'dec'? this.servings-1: this.servings+1);
        
        
        this.ingredients.forEach(el3 =>{
            el3.count *= (newSer/this.servings);
        });
       
        this.servings =newSer;
    }
};