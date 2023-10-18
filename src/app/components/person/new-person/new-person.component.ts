import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog'
import { Person } from 'src/app/model/person/person';
import { PersonService } from 'src/app/service/person/person.service';

@Component({
  selector: 'app-new-person',
  templateUrl: './new-person.component.html',
  styleUrls: ['./new-person.component.scss']
})
export class NewPersonComponent implements OnInit {

  message: String;
  person = new Person('',false,'','','','','','','','','','','','','','','','');

  newPersonForm = this.fb.group({
    idCardNumber: null,
    isCompany: false,
    nationalInsuranceNumber: null,
    taxRegistrationNumber: null,
    nameLine:[null, Validators.required],
    firstName: [null, Validators.required],
    middleName: [null, Validators.required],
    lastName: [null, Validators.required],
    organisationName: [null, Validators.required] 
  });

  constructor(private fb: FormBuilder, public dialog: MatDialog,private personService: PersonService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.personService
    .newPerson(this.person)
      .subscribe((response) => {
        if (response.status === 200) {
          this.refreshPerson();
          this.message = 'Person successfully added';
          console.log(this.message);
        } else {
          this.message = 'Upps some error adding a person';
          console.log(this.message);
        }
      }
      );
  }

  refreshPerson(){
    this.person = new Person('',false,'','','','','','','','','','','','','','','','');
  }

}
