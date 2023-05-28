import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomResponse } from 'src/app/interfaces/Custom-response';
import { AgentService } from 'src/app/services/Agent.service';

@Component({
  selector: 'app-change-pwd',
  templateUrl: './change-pwd.component.html',
  styleUrls: ['./change-pwd.component.css']
})
export class ChangePwdComponent {
  pwdResponse!: CustomResponse;

  constructor(private agentService: AgentService, private router: Router) { }

  changePwd(form: NgForm) {

    if (form.value.newPassword === form.value.confirmPassword) {
      this.agentService.changePassword$(form.value).subscribe(response => {
        this.pwdResponse = response;
      })
    }
    form.reset();

    sessionStorage.removeItem('token');
    this.router.navigate(['']);

  }
}