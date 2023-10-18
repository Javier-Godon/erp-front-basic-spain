import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatRow, MatTableDataSource } from '@angular/material/table';
import { AfterViewInit, ViewChild } from '@angular/core';
import { Person } from 'src/app/model/person/person';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog'
import { PersonService } from 'src/app/service/person/person.service';
import { SearchString } from 'src/app/model/person/search-string';
import { PersonDetailedCardComponent } from '../person-detailed-card/person-detailed-card.component';
import { DeletePersonDialogComponent } from '../delete-person-dialog/delete-person-dialog.component';
import { PersonComponent } from '../person.component';
import { NewPersonComponent } from '../new-person/new-person.component';

@Component({
  selector: 'app-person-main-and-list',
  templateUrl: './person-main-and-list.component.html',
  styleUrls: ['./person-main-and-list.component.scss']
})
export class PersonMainAndListComponent implements OnInit, AfterViewInit {

  message: string;
  searchString: SearchString;
  personList: Person[];

  displayedColumns: string[] = ['isCompany','nameLine','description', 'delete'];
  dataSource: MatTableDataSource<Person>;

  selectedPerson: Person;

  // Person:
  // public personId: String,
  // public isCompany: Boolean,
  // public idCardNumber: String,
  // public idCardNumberSecondPart: String,
  // public nationalInsuranceNumber: String,
  // public nationalInsuranceNumberSecondPart: String,
  // public taxRegistrationNumber: String,
  // public taxRegistrationNumberSecondPart: String,
  // public nameLine: String,
  // public firstName: String,
  // public middleName: String,
  // public lastName: String,
  // public fathersName: String,
  // public mothersName: String,
  // public dateOfBirth: any,//date
  // public organisationName: String,
  // public addressBirth: String,//idAddressBirth
  // public currentAddress: String,//idCurrentAddress


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    private personService: PersonService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.dataSource = new MatTableDataSource(this.personList);
  }

  ngOnInit(): void {
    this.getPersonList(new SearchString(""));
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getPersonList(searchString: SearchString) {
    this.personService
      .getSomePersons(searchString)
      .subscribe((response) => {
        if (response.status === 200) {
          this.personList = response.body;
          console.log(response.body);
          this.message = 'Persons list successfully loaded';
          console.log(this.message);
          this.dataSource = new MatTableDataSource(this.personList);
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

  reRenderTable() {
    this.dataSource = new MatTableDataSource(this.personList);
  }

  openPersonDetailedCardDialog(selectedRow: Person) {
    console.log("selected item (row): " + selectedRow.personId);
    this.selectedPerson = selectedRow;
    const dialogRef = this.dialog.open(PersonComponent, this.personDetailedCardConfig(selectedRow));

    dialogRef.afterClosed().subscribe(result => {
      console.log('Ok');
      this.ngOnInit();
      //refresh page -->trick the Router into believing it's last link wasn't previously loaded
      this.router.navigated = false;
      // if you need to scroll back to top, here is the right place
      window.scrollTo(0, 0);
    });
  }

  closeNewCategoryDialog(): void {

  }

  openNewPersonDialog(): void {
    const dialogRef = this.dialog.open(NewPersonComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('person created with id: ' + result.personId);
      this.ngOnInit();
      //refresh page -->trick the Router into believing it's last link wasn't previously loaded
      this.router.navigated = false;
      // if you need to scroll back to top, here is the right place
      window.scrollTo(0, 0);
    });
  }

  openDeletePersonDialog(selectedRow: Person) {
    console.log("selected item to delete (row): " + selectedRow.personId);
    this.selectedPerson = selectedRow;
    const dialogRef = this.dialog.open(DeletePersonDialogComponent, this.deletePersonDialogConfig());

    dialogRef.afterClosed().subscribe(result => {
      console.log('Ok');
      this.ngOnInit();
      //refresh page -->trick the Router into believing it's last link wasn't previously loaded
      this.router.navigated = false;
      // if you need to scroll back to top, here is the right place
      window.scrollTo(0, 0);
    });
  }

  deletePersonDialogConfig(): MatDialogConfig {
    const dialogConfig = new MatDialogConfig();
    this.dialogConfig(dialogConfig);
    dialogConfig.data = this.selectedPerson;
    return dialogConfig;

  }

  personDetailedCardConfig(selectedRow: Person): MatDialogConfig {
    const dialogConfig = new MatDialogConfig();
    this.dialogConfig(dialogConfig);
    dialogConfig.disableClose = false;
    dialogConfig.width = "70%";
    dialogConfig.height = "90%";
    dialogConfig.data = selectedRow;
    return dialogConfig;

  }

  dialogConfig(dialogConfig: MatDialogConfig) {
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
  }

}
