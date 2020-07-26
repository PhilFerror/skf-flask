import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

import { Projects } from './view.model';
import { projectData } from './data';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ProjectViewComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;

  projectData: Projects[];
  selected: string;

  constructor(private modalService: NgbModal,
              private router: Router) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Checklists' }, { label: 'View', active: true }];

    this.projectData = projectData;

    this.selected = '';
  }

  projectCreate() {
    this.router.navigate(['/projects/wizard']);
  }

  onView() {
    this.router.navigate(['/projects/summary']);
  }

}