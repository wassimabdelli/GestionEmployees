import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {


  EmployeeArray : any[] = [];

  employeename : string = "";
  employeeaddress : string = "";
  mobile : number = 0;

  currentEmployeeID = ""; 

  constructor( private http : HttpClient ) 
  {
    this.getAllCustomer();

  }

  getAllCustomer()
  {
    
    this.http.get("http://localhost:8080/api/v1/employee/getAllEmployees")
  
    .subscribe((resultData: any)=>
    {
       
        console.log(resultData);
        this.EmployeeArray = resultData;
    });
  }
 
  register()
  {
  
    let bodyData = {
      "employeename" : this.employeename,
      "employeeaddress" : this.employeeaddress,
      "mobile" : this.mobile
    };
 
    this.http.post("http://localhost:8080/api/v1/employee/save",bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Employee Registered Successfully");
        this.getAllCustomer();
        this.employeename = '';
        this.employeeaddress = '';
        this.mobile  = 0;
    });
  }

    cleardata()
    {
      this.getAllCustomer();
      this.employeename = '';
      this.employeeaddress = '';
      this.mobile  = 0;

    }
  
    setUpdate(data: any)
    {
     this.employeename = data.employeename;
     this.employeeaddress = data.employeeaddress;
     this.mobile = data.mobile;
     this.currentEmployeeID = data.employeeid;
    }


    UpdateRecords()
    {
      let bodyData = {
        "employeeid" : this.currentEmployeeID,
        "employeename" : this.employeename,
        "employeeaddress" : this.employeeaddress,
        "mobile" : this.mobile
      };
      
      this.http.put("http://localhost:8080/api/v1/employee/UpdateEmployees",bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
      {
          console.log(resultData);
          alert("Employee Registered Updateddd")
          this.getAllCustomer();
          this.employeename = '';
          this.employeeaddress = '';
          this.mobile  = 0;
      });
    }
   
    save()
    {
      if(this.currentEmployeeID == '')
      {
          this.register();
      }
        else
        {
         this.UpdateRecords();
        }      
   
    }

    
  setDelete(data: any)
  {   
    
    
    this.http.delete("http://localhost:8080/api/v1/employee/delete"+ "/"+ data.employeeid,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Employee Deletedddd")
        this.getAllCustomer();
        this.employeename = '';
      this.employeeaddress = '';
        this.mobile  = 0;
  
    });
 
  }
  ngOnInit(): void {
  }

}
