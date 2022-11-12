import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IContact } from 'src/app/models/IContact';
import { IGroup } from 'src/app/models/IGroup';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
  public loading : boolean =false;
  public contact : IContact = {} as IContact;
  public errorMessage : string |null =null;
  public groups: IGroup[]= [] as IGroup[];

  constructor(private ContactService : ContactService, private router : Router) { }

  ngOnInit(): void {
    this.contactService.getAllGroups().subscribe(next:(data:IGroup)=>{
      this.groups =data;
    }, error(error)=>{
      this.errorMessage=error;

    })
  }
  public createSubmit(){
    this.contactService.createContact(this.contact).subscribe(next:(data : IContact)=>{
        this.router.navigate(commands:['/']).then();
    }, error(error)=>{
      this.errorMessage=error;
      this.router.navigate(commands:['/contacts/add']).then();
    })
  }

}
