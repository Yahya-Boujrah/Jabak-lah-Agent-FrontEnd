import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {faArrowRightFromBracket, faUser, faHouse, faUserGroup, faScroll,
  faNoteSticky, faRightFromBracket, faCaretDown, faArrowUpWideShort, faTableList} from '@fortawesome/free-solid-svg-icons';
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
  faArrowUpWideShort = faArrowUpWideShort;
  faTableList=faTableList;

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

  products(){
    this.router.navigate(['products'], {relativeTo: this.route});
  }
  orders(){
    this.router.navigate(['orders'], {relativeTo: this.route});
  }

  logout(){
    sessionStorage.removeItem('token');
    this.router.navigate(['']);
  }
}
