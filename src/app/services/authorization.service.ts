import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor() { }

  generateAuthorization(){
    
    let token = window.localStorage.getItem("authorizationToken");
    let authorization = '';
    if(token){
      authorization = 'Bearer '+token;
      
    }
    return authorization;

  }
}
