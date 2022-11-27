import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IContact } from 'src/app/models/IContact';
import { IGroup } from 'src/app/models/IGroup';
import { Router } from '@angular/router';
import {ContactService} from "../../services/contact.service";

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  public contactId: string | null =null;
  public loading: boolean =false;
  contact : IContact = {
    id : '',
    name: '',
    email: '',
    photo: '',
    mobile: '',
    company: '',
    title: '',
    groupId: '',

  }

  groups : IGroup ={
    id: '',
    name: '',
  }
  constructor(private activatedRoute : ActivatedRoute,
  private contactService: ContactService,
  private router : Router) { }

  ngOnInit(): void {
    this.loading= true;
    this.activatedRoute.paramMap.subscribe( (param )=>{
      this.contactId = param.get('contactId')
    });
    if(this.contactId){
      this.contactService.getContact(this.contactId).subscribe({
        next:(data: IContact)=>{
            this.contact = data;
            this.loading= false;
            this.contactService.getAllGroups().subscribe({
              next:(data: IGroup)=>{
              this.groups= data;

            })
          }, error:(err)=>{
              console.log(err)
              this.loading=false;
          }
        })
      }
    
    
  }
  submitUpdate(){
    if(this.contactId){
      this.contactService.updateContact(this.contact, this.contact.id).subscribe({
        next:(data: IContact)=>{
        this.router.navigate(['/']);
      }, error:(err)=>{
        console.log(err);
       // this.router.navigate(['/contacts/edit/$(this.contactId)]);
        }
      })
    }
  }
}
