import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css']
})
export class MyCoursesComponent {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(DialogAnimationsExampleDialog, {
      panelClass: 'my-dialog-class', // Dodaj klasę CSS
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
@Component({
  selector: 'chips-autocomplete-example',
  templateUrl: 'dialog-example.html',
  styleUrls: ['./my-courses.component.css'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class DialogAnimationsExampleDialog {}
