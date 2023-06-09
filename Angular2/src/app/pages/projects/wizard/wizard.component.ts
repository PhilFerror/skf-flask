import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ChecklistCategoryService } from '../../../core/services/checklist_category.service';
import { QuestionService } from '../../../core/services/question.service';
import { ChecklistService } from '../../../core/services/checklists.service';
import { SprintService } from '../../../core/services/sprint.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { empty } from 'rxjs';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class WizardComponent implements OnInit
{

  project_id = Number(localStorage.getItem("project_id"))
  selected: string;
  categoryData: any = [];
  questionData: any= [];
  sprintData: any= [];
  maturityData = [{ "id": 1, "title": "Level 1" }, { "id": 2, "title": "Level 2" }, { "id": 3, "title": "Level 3" }]
  checklistData: any;
  breadCrumbItems: Array<{}>;
  isSubmitted: boolean;
  newSprintForm: FormGroup;
  sprint_id: number;
  sprintStore: any = [];
  routerId;
  disableSubmit = false;

  constructor(
    private _checklistCategoryService: ChecklistCategoryService,
    private _questionService: QuestionService,
    private _checklistService: ChecklistService,
    private _sprintService: SprintService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private router: Router,
  ) { }

  ngOnInit(): void
  {
    localStorage.setItem("sprint_id", "0");
    this.breadCrumbItems = [{ label: 'Projects' }, { label: 'Wizard', active: true }];

    this.newSprintForm = this.formBuilder.group({
      name: ['', Validators.required, null, { disabled: true }],
      description: ['', Validators.required],
      project_id: [],
    })

    this.selected = '';
    this.getCategories()
    this.selectSprints();

    this.routerId = localStorage.getItem('routerId');
  }

  onChange(value)
  {
    this.disableSubmit = false;
    this.selected = value;
  }

  getCategories()
  {
    this._checklistCategoryService.getChecklistCategoryCollection().subscribe(data => this.categoryData = data);
  }

  selectChecklistsOnChange(category_id: number)
  {
    this._checklistService.getChecklistsCollection(category_id).subscribe(checklist => this.checklistData = checklist);
  }

  selectQuestionaireOnChange(checklist_type_id: number)
  {
    localStorage.removeItem("checklist_type_id")
    localStorage.setItem("checklist_type_id", checklist_type_id.toString())
    this._questionService.getQuestionCollection(checklist_type_id).subscribe(question => { 
      this.questionData = [...this.questionData, ...question["items"]]
      console.log(this.questionData)
    });
  }

  selectSprints()
  {
    this._sprintService.getSprintsCollection(this.project_id).subscribe(sprint => this.sprintData = sprint)
    console.log(this.sprintData)
  }

  selectMaturityOnChange(maturity_id: number)
  {
    localStorage.removeItem("maturity")
    localStorage.setItem("maturity", maturity_id.toString());
  }

  storeSprintLocalStorage(form: NgForm)
  {
    localStorage.setItem('questions', JSON.stringify(form.value));
    return
  }

  storeSprint()
  {
    this.disableSubmit = false;

    if(!this.selected){
      this.disableSubmit = true;
    }

    if(this.selected == "new"){
      if (this.newSprintForm.invalid) {
        this.disableSubmit = true;
        return;
      }
      this.newSprintForm.patchValue({ project_id: this.project_id })
      this._sprintService.createSprint(this.newSprintForm.value).subscribe(sprint =>
      {
        localStorage.setItem("sprint_id", sprint['sprint_id'])
      })
    }
    
    if(this.selected == "old" && localStorage.getItem("sprint_id") == "0"){
      this.disableSubmit = true;
      return;
    }
  }

  oldSprint(sprint_id: number)
  {
    localStorage.setItem("sprint_id", sprint_id.toString())
  }

  storeQuestions()
  {
    this.spinner.show();
    const sprint_items = JSON.parse(localStorage.getItem('questions'));
    const count_sprint = Object.keys(sprint_items).length

    this.sprintStore = [];

    for (let i = 1; i < count_sprint + 1; i++) {
      if (sprint_items['answer' + i] > 0) {
        this.sprintStore.push({
          'project_id': this.project_id,
          'sprint_id': Number(localStorage.getItem("sprint_id")),
          'question_id': Number(sprint_items['answer' + i]),
          'result': 'True',
        });
      }
    }

    if (count_sprint == 0 || this.sprintStore.length == 0) {
      this.sprintStore.push({
        'project_id': this.project_id,
        'sprint_id': Number(localStorage.getItem("sprint_id")),
        'question_id': 0,
        'result': 'True',
      });
    }

    setTimeout(() =>
    {
      this._questionService.storeSprintQuestions(
        Number(localStorage.getItem("maturity")),
        this.sprintStore)
        .subscribe(()=>{
          this.spinner.hide();
          this.router.navigate(['/projects/view', this.project_id]);
        });
    }, 2000);
  }



  updateAllComplete(value){
    console.log(value)
  }

}