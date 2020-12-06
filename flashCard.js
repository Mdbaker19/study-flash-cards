$(document).ready(function (){
   fetch(baseURL)
       .then(r => r.json())
       .then(d => console.log(d));

   async function recallCards(){
      fetch(baseURL)
          .then( r => r.json())
          .then( d => console.log(d));
   }

   function createNewCard(title, question, body){
      return {
         title: title,
         question: question,
         body: body
      }
   }


});