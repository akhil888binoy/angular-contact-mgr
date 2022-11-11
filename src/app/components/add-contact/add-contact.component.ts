import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
  public loading : boolean =false;
  public conatc : IContact = {} as IContact;
  public errorMessage : string |null =null;
  public groups: IGroup[]= [] as IGroup[];

  constructor(private ContactService : ContactService) { }

  ngOnInit(): void {
    this.contactService.getAllGroups().subscribe(next:(data:IGroup)=>{
      this.groups =data;
    }, error(error)=>{
      this.errorMessage=error;
      
    })
  }

}
