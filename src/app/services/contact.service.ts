import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private static serverUrl: string ='http://localhost:9000';//json server url
  constructor(private httpClient : HttpClient) { }

  public getAllContacts():Observable<IContact[]>{
    let dataURL: string = '$(this.serverUrl)/contacts';
    return this.httpClient.get<IContact[]>(dataURL).pipe(catchError(this.handleError));
  }
  public handleError(error: HttpErrorResponse){
    let errorMessage: string ='';
    if(error.error instanceof ErrorEvent){
      errorMessage='Error: $(error.error.message)'
    }else{
      errorMessage='Status : $(error.status)\n Message: ${error.message}'
    }
    return throwError(errorMessage);

  }
  public getContact(contactId: string ):Observable<IContacts>{
    let dataURL: string ='${this.serverUrl}/contacts/${contactId}';
    return this.httpClient.get<IContact>(dataURL).pipe(catchError(this.handleError));
  }

  public createContact(contact: IContact):Observable<IContact>{
    let dataURL: string = '$(this.serverUrl)/contacts';
    return this.httpClient.post<IContact>(dataURL,contact).pipe(catchError(this.handleError));

  }
  public updateContact(contact: IContact, contactID: string):Observable<IContact>{
    let dataURL: string = '$(this.serverUrl)/contacts/${contactId}';
    return this.httpClient.put<IContact>(dataURL,contact).pipe(catchError(this.handleError));

  }
  public deleteContact(contactId: string):Observable<{}>{
    let dataURL: string = '$(this.serverUrl)/contacts';
    return this.httpClient.delete<{}>(dataURL).pipe(catchError(this.handleError));

  }
}
