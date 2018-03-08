import { Injectable } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
//import { tokenNotExpired } from 'angular2-jwt-session';

// import { tokenNotExpired } from 'angular2-jwt';

// import { envConstant } from '../main/content/pages/envConstant';

@Injectable()
export class Auth {

  constructor( private router: Router) {}

  	// base_url = envConstant.BASE_URL

  	loggedIn() {

  		var url      = window.location.href
	  	let token =  sessionStorage.getItem('currentUser');
		if(token){
		  	return token;
		}else{

		  	window.location.href= "http://localhost:4200";

		  	// window.location.href= "http://demo.host3e.com:3018";
		}
		
	}

 }
