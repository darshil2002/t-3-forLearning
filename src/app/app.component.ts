import { Component } from '@angular/core';
import { MyservService } from './allserv/myserv.service';
import { BehaviorSubject, pluck } from 'rxjs';
import { editGetMethodPayload, postMethod } from './myInterface/mainInterface';
import 'formdata-polyfill';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 't3';
  constructor(private myserv: MyservService) {}
  public data: any = [];
  // tempData = new BehaviorSubject<postMethod>({
  //   programID: '',
  //   ProgramName: '',
  //   ProgramNumber: 0,
  //   ProgramBudget: 0,
  //   ProgramDescription: '',
  //   IsVirtual: false,
  // });

editFormData:editGetMethodPayload={
  canDelete:false,
  isActive: false,
  isVirtual: false,
  programBudget: 0,
  programDescription: '',
  programID: '',
  programName: '',
  programNumber: '',
}
resVeriable:any;

  ngOnInit() {
    this.myserv
      .getData()
      .pipe(pluck('programs'))
      .subscribe((res) => {
        // console.log(res);
        this.data = res;
        // console.log(this.data);
      });
  }

  addNewProgram(addNewProgram: postMethod) {
    // console.log(addNewProgram);

    const formObject = new FormData() as any;
    Object.keys(addNewProgram).forEach((keys) => {
      formObject.append(keys, (addNewProgram as any)[keys]);
    });

    formObject.forEach((key: any, value: any) => {
      console.log(key, value);
    });
    this.myserv.sendNewdataToApi(formObject).subscribe((res) => {
      console.log(res);
    });
  }

  changeActivity(data: postMethod) {
    // console.log(data);
    this.myserv.makeDeactivate(data).subscribe();
  }
  editButtonClicked(data:editGetMethodPayload){
    // console.log(data);
    //  console.log(data.programID);
    this.myserv.myForm.programID=data.programID
    // this.myserv.myForm.programBudget=data.programBudget
    // this.myserv.myForm.programDescription=data.programDescription
    // this.myserv.myForm.programName=data.programName
    // this.myserv.myForm.programNumber=data.programNumber
  //  this.myserv.myForm=data
  //  console.log('lksjdflkdsajflkjs');
   
  // console.log(this.myserv.myForm.programID);
   
     this.myserv.editGetRequest(data.programID).pipe(pluck('program')).subscribe(res=>{
      // console.log(res);
      this.resVeriable=res;
      this.editFormData.programID=data.programID,
      // console.log(this.resVeriable);
      this.editFormData.programID=this.resVeriable.programID;
      this.editFormData.programBudget=this.resVeriable.programBudget;
      this.editFormData.programName=this.resVeriable.programName;
      this.editFormData.programNumber=this.resVeriable.programNumber;
      this.editFormData.programDescription=this.resVeriable.programDescription;
      // console.log(this.editFormData);
     })
  }

  editForm(data:editGetMethodPayload){
     console.log(data);
    this.myserv.editFinalSubmit(data).subscribe()
    // window.location.reload();
    setTimeout(() => {
      // call the function you want to run after the delay here
      console.log('Function executed after 1 second');
      window.location.reload();
    }, 1000);
  }
}
