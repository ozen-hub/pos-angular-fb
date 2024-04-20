import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {CurrencyPipe, JsonPipe, NgForOf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {AngularFireStorage} from "@angular/fire/compat/storage";


@Component({
  selector: 'app-customer-all',
  standalone: true,
  imports: [
    NgForOf,
    CurrencyPipe,
    MatIcon,
    MatIconButton,
    RouterLink,
    JsonPipe
  ],
  templateUrl: './customer-all.component.html',
  styleUrl: './customer-all.component.scss'
})
export class CustomerAllComponent implements OnInit{

  customers:any[]=[];

  constructor(private db:AngularFirestore, private storage:AngularFireStorage) {
  }
  ngOnInit(): void {
    this.db.collection('customers').get().subscribe(querySnapshot=>{
      querySnapshot.forEach(doc=>{
        this.customers.push({id:doc.id, data:doc.data()});
      })
    });
  }


  deleteCustomer(id:any, avatar:any){
    if(confirm('are your sure?')){
      this.db.collection('customers').doc(id).delete();
      this.storage.storage.refFromURL(avatar).delete();
    }
  }

}
