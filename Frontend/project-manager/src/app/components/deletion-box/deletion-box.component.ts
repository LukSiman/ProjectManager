import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-deletion-box',
  templateUrl: './deletion-box.component.html',
  styleUrls: ['./deletion-box.component.css'],
})
export class DeletionBoxComponent {

  @Input() deleteID: number;

  constructor(public activeModal: NgbActiveModal, private projectService: ProjectService) { }

  deleteProjectConfirm() {
    this.projectService.deleteProject(this.deleteID).subscribe(res => console.log(res));
    window.location.reload();
  }
}
