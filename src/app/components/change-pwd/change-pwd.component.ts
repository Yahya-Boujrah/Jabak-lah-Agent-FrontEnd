import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomResponse } from 'src/app/interfaces/Custom-response';
import { AgentService } from 'src/app/services/Agent.service';

import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-change-pwd',
  templateUrl: './change-pwd.component.html',
  styleUrls: ['./change-pwd.component.css']
})
export class ChangePwdComponent {
  pwdResponse!: CustomResponse;

  constructor(private agentService: AgentService, private router: Router, private toast: NgToastService) { }

  changePwd(form: NgForm) {

    if (form.value.newPassword === form.value.confirmPassword) {
      this.agentService.changePassword$(form.value).subscribe(response => {
        this.pwdResponse = response;
        this.toast.success({ detail: 'Success', summary: 'Password changed successfully', position: 'tr', duration: 2500 });
          sessionStorage.removeItem('token');
          this.router.navigate(['']);

      },error => {
        this.toast.error({ detail: 'Error', summary: 'Something gone wrong', position: 'tr', duration: 2500 });
        form.reset();
      })
    }else{
      this.toast.warning({ detail: 'Warning', summary: 'Password does not match', position: 'tr', duration: 2500 });
      form.reset();

    }
   
  }
}