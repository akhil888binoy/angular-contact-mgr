import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from " @angular/router";
import { IContact } from 'src/app/models/IContact';
import { IGroup } from 'src/app/models/IGroup';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.css']
})
export class ViewContactComponent implements OnInit {
  public loading:boolean =false;
  public contactId: string | null =null;
  contacts : IContact={
    id : '',
    name: '',
    email: '',
    photo: '',
    mobile: '',
    company: '',
    title: '',
    groupId: '',
  }
  group : IGroup ={
    id: '',
    name: '',
  }

  constructor(private activatedRoute: ActivatedRoute,
     private contactService: ContactService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(next: (param: Params)=>{
      this.contactId= param.get('contactId');
    });
    if(this.contactId){
      this.loading = true;
        this.contactService.getContact(this.contactId).subscribe( 
          next: (data: IContact)=>{
            this.contact = data;
            this.loading =false;
            this.contactService.getGroup(data).subscribe(
              next:(data: IGroup)=>{
              this.group = data;

            })
        }, error: (err)=>{
          console.log(err)
          this.loading =false;

        })
    }
}
  isNotEmpty(){
    return Object.keys(this.contact).length >0;

  }
}
