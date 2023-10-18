import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface LinksData {
  
}

@Component({
  selector: 'app-person-links-dialog',
  templateUrl: './person-links-dialog.component.html',
  styleUrls: ['./person-links-dialog.component.scss']
})
export class PersonLinksDialogComponent {

  constructor(private fb: FormBuilder) { }

  onSubmit() {
    alert('Thanks!');
  }

  personLinksForm = this.fb.group({
    mainPerson: null,
    linkedPerson: null
  });

  mainPersons = [
    { personId: 'xff,l23jkk', nameLine: 'Bosch palencia' }
  ];

  linkendPersons = [
    { personId: 'xff,l23jkk', nameLine: 'Bosch palencia' }
  ];

}
