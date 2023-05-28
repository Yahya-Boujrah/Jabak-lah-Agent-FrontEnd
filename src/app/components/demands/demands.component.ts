import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CustomResponse } from 'src/app/interfaces/Custom-response';
import { ProspectService } from 'src/app/services/Prospect.service';
import { faEye, faTrash, faSquareCheck} from '@fortawesome/free-solid-svg-icons';
import { Prospect } from 'src/app/interfaces/Prospect.interface';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-demands',
  templateUrl: './demands.component.html',
  styleUrls: ['./demands.component.css']
})
export class DemandsComponent implements OnInit {

  prospectResponse!: CustomResponse;

  editProspect !: Prospect;
  deleteProspect !: Prospect;
  approveProspect !: Prospect;

  faEye = faEye;
  faTrash = faTrash;
  faSquareCheck = faSquareCheck;
  
  public dataSubject = new BehaviorSubject<any>(null);

  

  constructor(private prospectService : ProspectService){}

  ngOnInit(): void {
    this.prospectService.prospects$.subscribe(response => {
      this.dataSubject.next(response); 

        this.prospectResponse = { ...response , data: { prospects: response.data.prospects?.reverse() } } 
    })
  }

  approve(prospect : Prospect){

    this.prospectService.convertProspect$(prospect).subscribe(response => {
      this.dataSubject.next(
        {...response, data: 
          { prospects: this.dataSubject.value.data.prospects.filter( (pr: { id: number | undefined; }) => pr.id !== prospect.id)}
        }
      )
      this.prospectResponse = this.dataSubject.value;
    });
  }
  delete(prospect: Prospect): void {
    this.prospectService.deleteProspect$(prospect.id as number).subscribe(response => {
      this.dataSubject.next(
        {...response, data: 
          { prospects: this.dataSubject.value.data.prospects.filter( (pr: { id: number | undefined; }) => pr.id !== prospect.id)}
        }
      )
      this.prospectResponse = this.dataSubject.value;
  });
}

  onOpenModal(prospect: Prospect, mode: string){

    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type ='button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');

    if(mode === 'approve'){
      this.approveProspect = prospect;
      button.setAttribute('data-bs-target', '#approveModal');
    }
    if(mode === 'view'){
      this.editProspect = prospect;
      button.setAttribute('data-bs-target', '#viewModal');
    }
    if(mode === 'delete'){
      this.deleteProspect = prospect;
      button.setAttribute('data-bs-target', '#deleteModal');
    }
    container?.appendChild(button);
    button.click();
  }

}
