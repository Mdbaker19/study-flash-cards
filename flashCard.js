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

   $("#cardContent").hover( function (){
      $(this).css({
         "transform": "rotateY(180deg)",
         "transition": "transform 2s"
      });
   }, function (){
      $(this).css({
         "transform": "revert",
         "transition": "transform 2s"
      });
   });


});