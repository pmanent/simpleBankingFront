import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { SpinnerComponent } from '../spinner/spinner.component';
import { SimpleBankServiceService } from '../services/simple-bank-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  dataSource=[];
  spinnerRef=null;
  displayedColumns: string[] = ['id', 'description', 'total'];
  statement='0 €';

  depositQuantity = "";
  withdrawQuantity = "";
  constructor(public dialog: MatDialog, public simpleBankServiceService:SimpleBankServiceService) { }
  
  ngOnInit() {
    var that = this;
    setTimeout(function(){
        that.updateTable();
    },500);
    
  }
  updateTable(){
    this.openDialog();
    this.simpleBankServiceService.getStatement()
    .subscribe(response => {
        console.log(response);

        this.dataSource = response.body.movements;
        
        this.statement = response.body.ammount+" €";
        
        this.closeDialog();
    },
    (err) => {
        console.log(err);
        this.showError('Wrong credentials');
        this.closeDialog();
    });
  }

  deposit(){
    
    this.openDialog();
    this.simpleBankServiceService.doDeposit(this.depositQuantity)
    .subscribe(response => {
        console.log(response);
        this.depositQuantity="";
        this.closeDialog();
        this.updateTable();
    },
    (err) => {
        console.log(err);
        let message = "Server Error"
        if(err.error && err.error.message){
            message = err.error.message
        }
        this.showError(message);
        this.closeDialog();
    });
  }
  withdraw(){
    
    this.openDialog();
    this.simpleBankServiceService.doWithdraw(this.withdrawQuantity)
    .subscribe(response => {
        console.log(response);
        this.withdrawQuantity="";
        this.closeDialog();
        this.updateTable();
    },
    (err) => {
        console.log(err);
        let message = "Server Error"
        if(err.error && err.error.message){
            message = err.error.message
        }
        this.showError(message);
        this.closeDialog();
    });
  }

  showError(error){
    const dialogConfig = new MatDialogConfig();
        
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data=error;
    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);
      
    });
  }

  openDialog(){
    const dialogConfig = new MatDialogConfig();
        
    dialogConfig.disableClose = true;
    
    this.spinnerRef = this.dialog.open(SpinnerComponent, dialogConfig);
  }

  closeDialog(){
    this.spinnerRef.close();
  }

}
