import {Directive, inject} from '@angular/core';
import {AbstractControl, NG_ASYNC_VALIDATORS, ValidationErrors} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";
import {environment} from "../../environments/environment";

@Directive({
  selector: '[appUniqueUsername]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: UniqueUsernameDirective,
      multi: true
    }
  ]
})
export class UniqueUsernameDirective {
  private apiUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}

  validate(control: AbstractControl): ValidationErrors | null {
    return this.httpClient.get<any[]>(`${this.apiUrl}api/v1/user?username=${control.value}`).pipe(
      map(users => users.length ? { appUniqueUsername: {error: 'Name is already taken'} }: null)
    );
  }

}
