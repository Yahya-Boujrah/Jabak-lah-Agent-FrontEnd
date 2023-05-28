import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {faArrowRightFromBracket, faUser, faHouse, faUserGroup, faScroll,
  faNoteSticky, faRightFromBracket, faCaretDown, faLock} from '@fortawesome/free-solid-svg-icons';
import { ProspectService } from 'src/app/services/Prospect.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  faArrowRightFromBracket= faArrowRightFromBracket;
  faUser=faUser;
  faHouse= faHouse;
  faUserGroup=faUserGroup;
  faScroll=faScroll;
  faNoteSticky=faNoteSticky;
  faRightFromBracket=faRightFromBracket;
  faCaretDown=faCaretDown;
  faLock = faLock;

  number : number = 0;

  constructor(private route: ActivatedRoute, private router: Router, private prospectService:ProspectService){}

  ngOnInit(): void {
    this.prospectService.currentNumber$.subscribe(value => {
      this.number = value;
    })
  }
  
  clients(){
    this.router.navigate(['clients'], {relativeTo: this.route});
  }
  home(){
    this.router.navigate(['navigation']);
  }
  infos(){
    this.router.navigate(['infos'], {relativeTo: this.route});
  }

  demands(){
    this.router.navigate(['demands'], {relativeTo: this.route});
  }

  changePwd(){
    this.router.navigate(['change-pwd'], {relativeTo: this.route});
  }

  logout(){
    sessionStorage.removeItem('token');
    this.router.navigate(['']);
  }
}
