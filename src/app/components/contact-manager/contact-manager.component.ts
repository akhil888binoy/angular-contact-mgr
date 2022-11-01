import { Component, OnInit } from '@angular/core';
import {IContact} from "../../models/IContact";
@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.css']
})
export class ContactManagerComponent implements OnInit {
  public loading:boolean =false;
  public contacts:IContact[]=[];
  public errorMessage:string |null =null;
  constructor(private contactService : ContactService) { }

  ngOnInit(): void {
    this.loading=true;
    this.contactService.getAllContacts().subscribe(next (data: IContact[])=>{
      this.contacts=data;
      this.loading=false;
    }, error:(error)=>{
      this.errorMessage=error;
      this.loading=false;
    })
  }

}
