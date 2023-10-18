import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { PersonService } from 'src/app/service/person/person.service';
import { PhoneNumberService } from 'src/app/service/person/phone-number.service';
import { EmailAddressService } from 'src/app/service/person/email-address.service';
import { PersonalLinksService } from 'src/app/service/person/personal-links.service';
import { AddressService } from 'src/app/service/person/address.service';
import { CountryService } from 'src/app/service/person/country.service';
import { AddressDialogComponent } from '../dialogs/address-dialog/address-dialog.component';
import { PersonLinksDialogComponent } from '../dialogs/person-links-dialog/person-links-dialog.component';
import { PersonPhoneNumber } from 'src/app/model/person/person-phone-number';
import { PersonEmailAddress } from 'src/app/model/person/person-emai-address';
import { Person } from 'src/app/model/person/person';
import { Country } from 'src/app/model/person/person-country';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PersonAddress } from 'src/app/model/person/person-address';
import { PersonPersonalLinks } from 'src/app/model/person/person-personal-links';
import { PersonListPickerComponent } from './person-list-picker/person-list-picker.component';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {

  personId: string;
  currentAddress: PersonAddress;
  country: Country;
  countriesList: Country[];
  person: Person;
  phoneNumber: string;
  emailAddress: string;
  personalLink: string;
  phoneNumbers: PersonPhoneNumber[];
  emailAddresses: PersonEmailAddress[];
  personalParentLinks: Person[];
  personalChildLinks: Person[];

  selectedPerson: Person;

  message: string;
  street: string;
  number: number;

  selectedPhoneNumber: PersonPhoneNumber;

  displayedColumnsPhone: string[] = ['phoneNumber', 'delete'];
  phoneNumbersDS: MatTableDataSource<PersonPhoneNumber>;
  displayedColumnsEmail: string[] = ['emailAddress', 'delete'];
  emailAddressDS: MatTableDataSource<PersonEmailAddress>
  displayedColumnsPersonalLink: string[] = ['nameLine', 'delete'];
  personalParentLinksDS: MatTableDataSource<Person>;
  personalChildLinksDS: MatTableDataSource<Person>;

  personForm = this.fb.group({
    isCompany: false,
    idCardNumber: null,
    nationalInsuranceNumber: null,
    taxRegistrationNumber: null,
    nameLine: null,
    firstName: null,
    middleName: null,
    lastName: null,
    address: null,
    address2: null,
    city: null,
    phoneNumber: null,
    emailAddress: null,
    postalCode: null,
    shipping: null
  });

  addressForm = this.fb.group({
    addressId: null,
    countryId: null,
    administrativeArea: null,
    administrativeAreaIso: null,
    locality: null,
    dependentLocality: null,
    postalCode: null,
    street: null,
    streetNumber: null,
    streetType: null,
    premise: null,
    subPremise: null,
    department: null,
    floor: null,
    letter: null,
    stairs: null,
    decimalDegreesLatitude: null,
    decimalDegreesLongitude: null
  })

  hasUnitNumber = false;

  constructor(private fb: FormBuilder, public dialog: MatDialog, private personService: PersonService
    , private phoneNumberService: PhoneNumberService, private emailAddressService: EmailAddressService
    , private personalLinksService: PersonalLinksService, private addressService: AddressService
    , private countryService: CountryService,
    @Inject(MAT_DIALOG_DATA) public personData: Person,
    @Inject(MAT_DIALOG_DATA) public personAddressData: PersonAddress,
    private changeDetectorRefs: ChangeDetectorRef, private router: Router) {
    this.person = personData;
    this.currentAddress = personAddressData;
    console.log("person passed to dialog: " + this.person.firstName);
  }

  openAddressDialog(): void {
    const dialogRef = this.dialog.open(AddressDialogComponent, {
      data: { street: this.street, number: this.number }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.street = result;
    });
  }

  openLinksDialog(): void {
    const dialogRef = this.dialog.open(PersonLinksDialogComponent, {
      data: { street: this.street, number: this.number }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.street = result;
    });
  }

  deletePhoneFromPerson(selectedRow: PersonPhoneNumber): void {
    if (confirm("Se va a borrar el número: " + selectedRow.phoneNumber)) {
      this.phoneNumberService
        .deletePhoneNumber(selectedRow.phoneNumberId)
        .subscribe((response) => {
          if (response.status === 200) {
            this.getPhoneList(this.person.personId);
            this.message = 'Phone successfully deleted';
            console.log(this.message);
          } else {
            this.message = 'Upps some error deleting a phone number';
            console.log(this.message);
          }
        }
        );
    }
  }

  deleteEmailFromPerson(selectedRow: PersonEmailAddress): void {
    if (confirm("Se va a borrar la dirección de correo: " + selectedRow.emailAddress)) {
      this.emailAddressService
        .deleteEmail(selectedRow.emailAddressId)
        .subscribe((response) => {
          if (response.status === 200) {
            this.getEmailList(this.person.personId);
            this.message = 'Email successfully deleted';
            console.log(this.message);
          } else {
            this.message = 'Upps some error deleting an email address';
            console.log(this.message);
          }
        }
        );
    }
  }

  deleteParentPersonalLinkFromPerson(selectedRow: Person): void {
    console.log("person to delete: " + selectedRow)
    console.log("Id person to delete: " + selectedRow.personId + " from selected personId: " + this.person.personId)
    if (confirm("Se va a borrar la dependencia de: " + selectedRow.personId)) {
      this.personalLinksService
        .deletePersonalLinkRelation(selectedRow.personId, this.person.personId)
        .subscribe((response) => {
          if (response.status === 200) {
            this.getParentPersonalLinks(this.person.personId);
            this.message = 'Personal link successfully deleted';
            console.log(this.message);
          } else {
            this.message = 'Upps some error deleting a parent personal link';
            console.log(this.message);
          }
        }
        );
    }
  }

  deleteChildPersonalLinkFromPerson(selectedRow: Person): void {
    console.log("person to delete: " + selectedRow)
    console.log("Id person to delete: " + selectedRow.personId + " from selected personId: " + this.person.personId)
    if (confirm("Se va a borrar la dependencia de: " + selectedRow.personId)) {
      this.personalLinksService
        .deletePersonalLinkRelation(this.person.personId, selectedRow.personId)
        .subscribe((response) => {
          if (response.status === 200) {
            this.getChildPersonalLinks(this.person.personId);
            this.message = 'Personal link successfully deleted';
            console.log(this.message);
          } else {
            this.message = 'Upps some error deleting a child personal link';
            console.log(this.message);
          }
        }
        );
    }
  }

  addPhoneToPerson(event) {
    var personPhoneNumber: PersonPhoneNumber = new PersonPhoneNumber(null, this.person.personId, event.target.value, null);
    console.log(personPhoneNumber);
    this.savePersonPhoneNumber(personPhoneNumber);
    this.changeDetectorRefs.detectChanges();
    this.phoneNumber = '';
  }

  addEmailAddressToPerson(event) {
    var personEmailAddress: PersonEmailAddress = new PersonEmailAddress(null, this.person.personId, event.target.value, null);
    console.log(personEmailAddress);
    this.savePersonEmailAddress(personEmailAddress);
    this.changeDetectorRefs.detectChanges();
    this.emailAddress = '';
  }

  addPersonalLinkToPerson(event) {
    var personPersonalLink: PersonPersonalLinks = new PersonPersonalLinks(null, event.target.value, this.person.personId);
    console.log(personPersonalLink);
    this.savePersonPersonalLink(personPersonalLink);
    this.changeDetectorRefs.detectChanges();
    this.personalLink = '';
  }

  savePersonPhoneNumber(personPhoneNumber: PersonPhoneNumber) {
    this.phoneNumberService
      .newPhoneNumber(personPhoneNumber)
      .subscribe((response) => {
        if (response.status === 200) {
          this.getPhoneList(this.person.personId);
          this.message = 'Phone successfully added';
          console.log(this.message);
        } else {
          this.message = 'Upps some error adding a phone number';
          console.log(this.message);
        }
      }
      );
  }

  savePersonEmailAddress(personEmailAddress: PersonEmailAddress) {
    this.emailAddressService
      .newEmail(personEmailAddress)
      .subscribe((response) => {
        if (response.status === 200) {
          this.getEmailList(this.person.personId);
          this.message = 'Email successfully added';
          console.log(this.message);
        } else {
          this.message = 'Upps some error adding an email address';
          console.log(this.message);
        }
      }
      );
  }

  savePersonPersonalLink(personalLink: PersonPersonalLinks) {
    this.personalLinksService
      .newPersonalLink(personalLink)
      .subscribe((response) => {
        if (response.status === 200) {
          this.message = 'Personal Link successfully added';
          this.getParentPersonalLinks(this.person.personId);
          console.log(this.message);
        } else {
          this.message = 'Upps some error adding a personal Link address';
          console.log(this.message);
        }
      }
      );
  }

  getPerson(personId: String) {
    this.personService
      .getPerson(personId)
      .subscribe((response) => {
        if (response.status === 200) {
          this.person = response.body;
          console.log(response.body);
          this.message = 'Person successfully loaded';
          this.getCurrentAddress(response.body.idCurrentAddress);
          console.log(this.message);
          // this.dataSource = new MatTableDataSource(this.person);
        }
        else {
          this.message = 'Upps some error loading Person with personId:' + personId;
          console.log(this.message);
        }
      }
      );
  }

  getPhoneList(personId: String) {
    console.log(personId);
    this.phoneNumberService
      .getPhoneNumberList(personId)
      .subscribe((response) => {
        if (response.status === 200) {
          this.phoneNumbers = response.body;
          this.phoneNumbersDS = new MatTableDataSource(response.body);
          console.log(response.body);
          this.message = 'Phone list successfully loaded';
          console.log(this.message);
          // this.dataSource = new MatTableDataSource(this.phoneNumbers);
        }
        else {
          this.message = 'Upps some error loading phone list';
          console.log(this.message);
          console.log(response.body);
        }
      }
      );
  }

  getEmailList(personId: String) {
    this.emailAddressService
      .getEmailList(personId)
      .subscribe((response) => {
        if (response.status === 200) {
          this.emailAddresses = response.body;
          this.emailAddressDS = new MatTableDataSource(response.body);
          console.log(response.body);
          this.message = 'Email list successfully loaded';
          console.log(this.message);
          // this.dataSource = new MatTableDataSource(this.emailAddresses);
        }
        else {
          this.message = 'Upps some error loading email list';
          console.log(this.message);
        }
      }
      );
  }


  getParentPersonalLinks(personId: String) {
    this.personalLinksService
      .getParentPersonalLinkList(personId)
      .subscribe((response) => {
        if (response.status === 200) {
          this.personalParentLinks = response.body;
          this.personalParentLinksDS = new MatTableDataSource(response.body);
          console.log(response.body);
          this.message = 'Parent Personal links list successfully loaded';
          console.log(this.message);
          // this.dataSource = new MatTableDataSource(this.emailAddresses);
        }
        else {
          this.message = 'Upps some error loading personal links list';
          console.log(this.message);
        }
      }
      );
  }

  getChildPersonalLinks(personId: String) {
    this.personalLinksService
      .getChildPersonalLinkList(personId)
      .subscribe((response) => {
        if (response.status === 200) {
          this.personalChildLinks = response.body;
          this.personalChildLinksDS = new MatTableDataSource(response.body);
          console.log(response.body);
          this.message = 'Children Personal links list successfully loaded';
          console.log(this.message);
          // this.dataSource = new MatTableDataSource(this.emailAddresses);
        }
        else {
          this.message = 'Upps some error loading personal links list';
          console.log(this.message);
        }
      }
      );
  }


  getCurrentAddress(currentAddressId: string) {
    if (!this.currentAddress.addressId) {
      this.currentAddress.addressId = currentAddressId;
    }
    this.addressService
      .getAddress(currentAddressId)
      .subscribe((response) => {
        if (response.status === 200) {
          this.currentAddress = response.body;
          console.log(response.body);
          this.message = 'Current Address successfully loaded';
          console.log(this.message);
          // this.dataSource = new MatTableDataSource(this.emailAddresses);
        }
        else {
          this.message = 'Upps some error loading Current Address';
          console.log(this.message);
        }
      }
      );
  }


  updatePerson() {
    this.personService
      .updatePerson(this.person)
      .subscribe((response) => {
        if (response.status === 200) {
          this.message = 'Person successfully added';
          console.log(this.message);
        } else {
          this.message = 'Upps some error adding a person';
          console.log(this.message);
        }
      }
      );
  }

  updateCurrentAddress() {
    this.addressService
      .updateAddress(this.currentAddress)
      .subscribe((response) => {
        if (response.status === 200) {
          this.message = 'Address successfully updated';
          console.log(this.message);
        } else {
          this.message = 'Upps some error updating address';
          console.log(this.message);
        }
      }
      );
  }

  openNewLinkDialog(relation: string): void {
    const dialogRef = this.dialog.open(PersonListPickerComponent, {
      data: { person: this.person }
    });

    console.log('relation: ' + relation);

    dialogRef.afterClosed().subscribe(result => {
      console.log('person selected: ' + result);
      this.selectedPerson = result;
      console.log('person selectedPerson: ' + this.selectedPerson);
      if (relation === 'parent') {
        this.savePersonPersonalLink(new PersonPersonalLinks(null, result.personId, this.person.personId))
        console.log('parent relation created');
      }
      if (relation === 'child') {
        this.savePersonPersonalLink(new PersonPersonalLinks(null, this.person.personId, result.personId))
        console.log('child relation created');
      }

      this.ngOnInit();
      //refresh page -->trick the Router into believing it's last link wasn't previously loaded
      this.router.navigated = false;
      // if you need to scroll back to top, here is the right place
      window.scrollTo(0, 0);
    });
  }



  onSubmit() {
    alert('Thanks!');
  }

  ngOnInit(): void {
    this.getPerson(this.person.personId);
    this.getPhoneList(this.person.personId);
    this.getEmailList(this.person.personId);
    this.getParentPersonalLinks(this.person.personId);
    this.getChildPersonalLinks(this.person.personId);
  }

}
