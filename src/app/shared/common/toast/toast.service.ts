import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private config = new MatSnackBarConfig();
  private horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  private verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private _snackBar: MatSnackBar) {
    this.config.horizontalPosition = this.horizontalPosition;
    this.config.verticalPosition = this.verticalPosition;
    this.config.duration = 2500;
  }

  public openSuccesToast(message: string) {
    this.config.panelClass = ['success-snackbar'];
    this._snackBar.open(message, undefined, this.config);
  }

  public openWarningToast(message: string) {
    this.config.panelClass = ['warning-snackbar'];
    this._snackBar.open(message, undefined, this.config);
  }

  public openFailToast(message: string) {
    this.config.panelClass = ['fail-snackbar'];
    this._snackBar.open(message, undefined, this.config);
  }
}
