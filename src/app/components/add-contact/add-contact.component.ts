import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IContact } from 'src/app/models/IContact';
import { IGroup } from 'src/app/models/IGroup';
import { ContactService } from "../../services/contact.service";


@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {

  contact: IContact = {
    id: '',
    name: '',
    email: '',
    photo: '',
    mobile: '',
    company: '',
    title: '',
    groupId: '',
  }

  groups : IGroup = {
    id: '' ,
    name: '',
  }

  constructor(private contactService : ContactService, private router : Router) { }

  ngOnInit(): void {
    this.contactService.getAllGroups().subscribe({
      next:(data:IGroup)=>{
      this.groups =data;
    }, error:(err)=>{
        console.log(err)
    }
    });
  }

 createSubmit(){
    this.contactService.createContact(this.contact).subscribe({
      next:(data)=>{
        this.router.navigate(["/"]);
    }, error:(err)=>{
      console.log(err);
      }
    });
  }
}
