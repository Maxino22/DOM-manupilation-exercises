// listening for submit button
document.getElementById('fizzbuzz').addEventListener('submit', function(e){
   
  // Hide results
    document.getElementById('results').style.display = 'none'; 

    // Show loader
    document.getElementById('loading').style.display = 'block';
  
    setTimeout(fizzBuzz, 2000);
  
    e.preventDefault();
});


// Function fizzbuzz
function fizzBuzz(){
  // Ul components
  const input = document.querySelector('#input');
  const output = document.querySelector('#output');


  if (input.value <= 0 || input.value === '')
    showError('Number has to be greater than One') ;
  else if ((input.value % 5 === 0) && (input.value % 3 ===0))
    output.value = 'FizzBuzz';
  else if(input.value % 3 === 0)
    output.value = 'Fizz';
  else if (input.value % 5 === 0)
    output.value = 'Buzz'; 
  else
   output.value = input.value;


  // Show Results
  document.getElementById('results').style.display = 'block'; 

  // Hide Loader
  document.getElementById('loading').style.display = 'none';


}

// show error

function showError(error){
   // create a div
   const errorDiv = document.createElement('div');
  
   // Get elements
   const card = document.querySelector('.card');
   const heading = document.querySelector('.heading');
 
   //  add class
   errorDiv.className = 'alert alert-danger';
 
   // create text node and append to div
   errorDiv.appendChild(document.createTextNode(error));
 
   // insert error above heading
   card.insertBefore(errorDiv, heading);
 
   // clear error after 3 seconds
   setTimeout(clearError, 3000);

}

// function error

function clearError(){
  document.querySelector('.alert').remove();
}