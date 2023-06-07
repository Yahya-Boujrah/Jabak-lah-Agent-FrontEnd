import { Component } from '@angular/core';
import { Agent } from 'src/app/interfaces/Agent.interface';
import { AgentService } from 'src/app/services/Agent.service';
import { faLock} from '@fortawesome/free-solid-svg-icons';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-agent-infos',
  templateUrl: './agent-infos.component.html',
  styleUrls: ['./agent-infos.component.css']
})
export class AgentInfosComponent {

  faLock =faLock;
  constructor(private agentService: AgentService, private router: Router, private route: ActivatedRoute){}

  agent ?: Agent;

  ngOnInit(): void {
    this.agentService.agent$.subscribe(result => {
      this.agent = result.data.agent;
    })
  }

  changePwd(){
    this.router.navigate(['navigation/change-pwd']);
  }


}
