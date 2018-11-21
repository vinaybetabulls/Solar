


import React, { Component } from 'react';
class LoginSignup extends Component {

    constructor()
    {
        super();
var url = 'http://localhost:8080/users/'

  fetch(url,{
      method:"post",data:JSON.stringify({"name":"mahesh"})
  })
  .then(function(response) {
    if (!response) {
      throw new Error("Bad response from server");
    }
    return response.text();
  })
  .then(function(data) {
  });
}
render()
{
    return(<div>Hi</div>)
}
}
export default LoginSignup;