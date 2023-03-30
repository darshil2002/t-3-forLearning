import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { editGetMethodPayload, postMethod } from '../myInterface/mainInterface';

@Injectable({
  providedIn: 'root'
})
export class MyservService {

myForm={
  // canDelete: false,
  isActive: false,
  isVirtual: false,
  programBudget: 0,
  programDescription: '',
  programID: '',
  programName: '',
  programNumber: '',
} 

  constructor(private http:HttpClient) { }
  getData(){
     return this.http.get('http://cmi-ofm.azurewebsites.net/api/Program')
  }
  sendNewdataToApi(data:postMethod){
    return this.http.post('http://cmi-ofm.azurewebsites.net/api/Program',data)
  }
  makeDeactivate(data:any){
    console.log(data);
    console.log('in serv');
    // console.log(data.programID);
    if(data.isActive==true){
      // ahiya form data type send karvo pade 
      // but still it is working 
      return this.http.delete(`http://cmi-ofm.azurewebsites.net/api/Program/${data.programID}`);
    }
    else{
      return this.http.put(`http://cmi-ofm.azurewebsites.net/api/Program/${data.programID}/Activate`,data.programID);
    }
    console.log(data.isActive);
  }
  editGetRequest(data:any){
    return this.http.get(`http://cmi-ofm.azurewebsites.net/api/Program/${data}`)
  }
  editFinalSubmit(data:editGetMethodPayload){
    //  this.myForm.programID=data.programID;
    this.myForm.programName=data.programName;
    this.myForm.programBudget=data.programBudget;
    this.myForm.programDescription=data.programDescription;
    this.myForm.programNumber=data.programNumber
data.programID=this.myForm.programID
console.log(this.myForm.programID);

    const myformObject = new FormData() as any;
    Object.keys(this.myForm).forEach((keys) => {
      myformObject.append(keys, (this.myForm as any)[keys]);
    });
    return this.http.put(`http://cmi-ofm.azurewebsites.net/api/program`,myformObject)

  }
}
