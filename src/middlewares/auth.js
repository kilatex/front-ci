 const url = 'http://localhost:8080/';
function isAuth ()  {

    if(!localStorage.getItem('token')){
      window.location.href = url+"login";
    }

    const token = localStorage.getItem('token');
    let headers = {

        'Authorization' : 'Bearer '+token
      }


      fetch('http://localhost:8000/api/auth/isauth', {
        method: 'GET', // or 'PUT'
        headers: headers
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if(data.error == "400"){
            window.location.href = url+"login";
          }
        })
       
   
  
}




export default isAuth;