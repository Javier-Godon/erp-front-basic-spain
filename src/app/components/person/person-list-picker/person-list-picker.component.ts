import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Person } from 'src/app/model/person/person';
import { SearchString } from 'src/app/model/person/search-string';
import { PersonService } from 'src/app/service/person/person.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-person-list-picker',
  templateUrl: './person-list-picker.component.html',
  styleUrls: ['./person-list-picker.component.scss']
})
export class PersonListPickerComponent implements OnInit {

  message: string;
  searchString: SearchString;
  personList: Person[];
  personListReduced: Person[];
  person: Person;

  personListForm = this.fb.group({
    personId: null
  });

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private fb: FormBuilder, public dialog: MatDialog, private personService: PersonService,
    @Inject(MAT_DIALOG_DATA) public personData: Person,
    private dialogRef: MatDialogRef<PersonListPickerComponent>) {
    // this.selectedPerson = new Person("",false,"","","","","","","","","","","","","","","","");
  }

  ngOnInit(): void {
    this.getPersonList(new SearchString(""));
  }

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }

  getPersonList(searchString: SearchString) {
    this.personService
      .getSomePersons(searchString)
      .subscribe((response) => {
        if (response.status === 200) {
          this.personList = response.body;
          this.personListReduced = this.personList.slice(0, 3);
          console.log(response.body);
          this.message = 'Persons list successfully loaded';
          console.log(this.message);
        }
        else {
          this.message = 'Upps some error loading persons list';
          console.log(this.message);
        }
      }
      );
  }

  refreshSearch(search: String) {
    console.log("has pulsado una tecla: " + search);
    this.searchString = new SearchString(search);
    this.getPersonList(this.searchString);
    console.log("SearchString: " + this.searchString)
    // this.reRenderTable();    
  }

  onSubmit() {

  }

  

}
