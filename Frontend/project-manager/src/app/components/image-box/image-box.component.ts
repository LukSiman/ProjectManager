import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbCarousel, NgbCarouselConfig, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { ProjectImages } from 'src/app/entities/project-images';

@Component({
  selector: 'app-image-box',
  templateUrl: './image-box.component.html',
  styleUrls: ['./image-box.component.css'],
  providers: [NgbCarousel]
})
export class ImageBoxComponent {

  @Input() images: ProjectImages[];
  @Input() initialID: string;

  constructor(public activeModal: NgbActiveModal, private ngbCarousel: NgbCarousel) {}

  ngOnInit(): void {
    this.initialID = `index_${this.initialID}`;
  }
}