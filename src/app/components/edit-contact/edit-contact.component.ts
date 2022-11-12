import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IContact } from 'src/app/models/IContact';
import { IGroup } from 'src/app/models/IGroup';
import { Router } from '@angular/router';
import { Params } from '@angular/router';
import {ContactService} from "../../services/contact.service";

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  public loading: boolean =false;
  public contactId : string | null =null;
  public contact : IContact ={} as IContact;
  public errorMessage: string | null = null;
  public groups : IGroup[]= [] as IGroup[]

  constructor(private activatedRoute : ActivatedRoute,
  private contactService: ContactService,
  private router : Router) { }

  ngOnInit(): void {
    this.loading= true;
    this.activatedRoute.paramMap.subscribe(next: (param : ParamMap)=>{
      this.contactId = param.get('contactId')
    });
    if(this.contactId){
      this.contactService.getContact(this.contactId).subscribe(next:(data: IContact)=>{
            this.contact = data;
            this.loading= false;
            this.contactService.getAllGroups().subscribe(next:(data: IGroup)=>{
              this.groups= data;

            })
          }, error:(error)=>{
              this.errorMessage=error;
              this.loading=false;
      })

    }
  }
  public submitUpdate(){
    if(this.contactId){
      this.contactService.updateContact(this.contact, this.contactId).subscribe(next:(data: IContact)=>{
        this.router.navigate(commands:['/']).then();
      }, error:(error)=>{
        this.errorMessage =error;
        this.router.navigate(commands:['/contacts/edit/$(this.contactId)']).then();
      })
    }
  }
}
