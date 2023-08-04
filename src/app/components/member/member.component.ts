import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

import {catchError, EMPTY, tap} from "rxjs";
import {AddMemberService} from "../../services/add-member.service";


@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent {

  userForm!: FormGroup
  isError: boolean = false

  constructor(private _formBuilder: FormBuilder,
              private _route: Router,
              private _addMemberService: AddMemberService) {
    this.userForm = this._formBuilder.group({
      username: [''],
      email: [''],
      birthDate: [null],
      elo: [null, [Validators.min(0), Validators.max(3000)]],
      gender: ['']
    })


  }

  ngOnInit() {
  }

  addUser() {
    if(this.userForm.valid){
      this._addMemberService.addUser(this.userForm.value).pipe(
        tap(() => this._route.navigateByUrl("/home")),
        catchError(()=> {
          this.toggleError()
          return EMPTY;
        })
      ).subscribe()
    }
  }

  toggleError(){
    this.isError = !this.isError
  }

}
