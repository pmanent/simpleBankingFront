import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { SpinnerComponent } from '../spinner/spinner.component';
import { SimpleBankServiceService } from '../services/simple-bank-service.service';
import { Router } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login='admin';
  password='welcome1';
  spinnerRef=null;

  constructor(public simpleBankServiceService:SimpleBankServiceService,
              public dialog: MatDialog,
              private router: Router) { }

  ngOnInit() {
  }
  doLogin(){
    this.openDialog();
    this.simpleBankServiceService.doLogin(this.login,this.password)
    .subscribe(response => {
      console.log(response);
      window.localStorage.setItem("authorizationToken",response.body.token);
      this.router.navigate(['./dashboard']);

      this.closeDialog();
    },
    (err) => {
      console.log(err);
      this.showError('Wrong credentials');
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
