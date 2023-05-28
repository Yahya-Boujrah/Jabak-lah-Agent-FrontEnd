import { Component, OnInit } from '@angular/core';
import {faEnvelope, faPhone} from '@fortawesome/free-solid-svg-icons';
import { CustomResponse } from 'src/app/interfaces/Custom-response';
import { AgentService } from 'src/app/services/Agent.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  faEnvelope = faEnvelope;
  faPhone = faPhone;

  agentResponse!: CustomResponse;

  constructor(private agentService:AgentService){}

  ngOnInit(): void {
    this.agentService.agents$.subscribe(response => {
      this.agentResponse = response;
    })
  }
}
