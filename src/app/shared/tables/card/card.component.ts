import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  categoriesContent = [
    {title: "AM", img:"AM.png"},
    {title: "A1", img:"A.png"},
    {title: "A2", img:"A.png"},
    {title: "A", img:"A.png"},
    {title: "B1", img:"B1.png"},
    {title: "B", img:"B.png"},
    {title: "B+E", img:"B+E.png"},
    {title: "C", img:"C.png"},
    {title: "C1", img:"C1.png"},
    {title: "C1+E", img:"C1+E.png"},
    {title: "C+E", img:"C+E.png"},
    {title: "D", img:"D.png"},
    {title: "D1", img:"D1.png"},
    {title: "D1+E", img:"D1+E.png"},
    {title: "D+E", img:"D+E.png"},
    {title: "T", img:"T.png"},
    {title: "Tramwaj", img:"Tramwaj.png"}
  ];

}
