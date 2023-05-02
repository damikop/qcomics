import {InjectionToken} from "@angular/core";
export const API_URL = new InjectionToken('token', {
  providedIn: 'root',
  factory: () => 'https://q-comics-account.herokuapp.com/'
})
