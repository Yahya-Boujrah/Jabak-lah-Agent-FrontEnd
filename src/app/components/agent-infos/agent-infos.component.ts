import { Component } from '@angular/core';
import { Agent } from 'src/app/interfaces/Agent.interface';
import { AgentService } from 'src/app/services/Agent.service';
import { LoginService } from 'src/app/services/Login.service';

@Component({
  selector: 'app-agent-infos',
  templateUrl: './agent-infos.component.html',
  styleUrls: ['./agent-infos.component.css']
})
export class AgentInfosComponent {

  constructor(private agentService: AgentService){}

  agent ?: Agent;

  ngOnInit(): void {
    this.agentService.agent$.subscribe(result => {
      this.agent = result.data.agent;
    })
  }


}
