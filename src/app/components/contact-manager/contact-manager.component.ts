import { Component, OnInit } from '@angular/core';
import { IContact } from "../../models/IContact";
import { ContactService } from "../../services/contact.service";
@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.css']
})
export class ContactManagerComponent implements OnInit {
  public loading:boolean =false;
  contacts : IContact = {
    id : '',
    name: '',
    email: '',
    photo: '',
    mobile: '',
    company: '',
    title: '',
    groupId: '',

  }

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.getAllContactsFromServer();
  }
  getAllContactsFromServer(){
    this.loading=true;
    this.contactService.getAllContacts(contacts).subscribe({
      next: (data: IContact)=>{
      this.contacts=data;
      this.loading=false;
    }, error:(err)=>{
      console.log(err);
      this.loading=false;
    }
    });
  }
  clickDeleteContact(contactId : string){
    if(contactId){
      this.contactService.deleteContact(contactId).subscribe({
        next:(data)=>{
        this.getAllContactsFromServer();
      }, error : (err)=>{
        console.log(err)
        }
      });
    }

}
