import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Person } from 'src/app/model/person/person';
import { Order } from 'src/app/model/sales/order';
import { PersonService } from 'src/app/service/person/person.service';
import { OrderLineService } from 'src/app/service/sales/order-line.service';
import { OrderService } from 'src/app/service/sales/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  client: Person;
  order: Order;

  constructor(private fb: FormBuilder, public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public clientData: Person,
    @Inject(MAT_DIALOG_DATA) public orderData: Order,
    private personService: PersonService,
    private orderService: OrderService,
    private orderLineService: OrderLineService,
    private changeDetectorRefs: ChangeDetectorRef, private router: Router,

    ) { 
      this.client = clientData;
      this.order = orderData;

    }

  ngOnInit(): void {
  }

}
