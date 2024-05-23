import { Component, OnInit } from '@angular/core';
import { CardDetails } from 'src/app/shared/common/card/card.component';
import { BaseStep } from '../../core/base-step';

const MOCK_SCHOOL_CARDS: CardDetails[] = [
  {
    label: 'Auto-Master\nCena: 2500zł',
    info: 'Auto-Master to nowoczesny ośrodek szkolenia kierowców, który oferuje innowacyjne metody nauczania oraz najnowsze technologie symulacji jazdy. Nasi instruktorzy to pasjonaci motoryzacji, którzy z zaangażowaniem przekazują wiedzę i umiejętności, aby każdy kursant mógł zdać egzamin za pierwszym razem.',
    imagePath: '../../../../assets/course.png',
    aspectRatio: '8/4',
    accentColor: `hsl(60, 80%, 40%)`,
    height: 40,
  },
  {
    label: 'Akademia Bezpiecznej Jazdy\nCena: 2500zł',
    info: 'Akademia Bezpiecznej Jazdy to renomowany ośrodek szkoleniowy, który stawia na bezpieczeństwo i profesjonalizm. Nasza doświadczona kadra instruktorska zapewnia kompleksowe szkolenie, przygotowując kursantów do bezpiecznego i pewnego prowadzenia pojazdu w każdych warunkach drogowych.',
    imagePath: '../../../../assets/course.png',
    aspectRatio: '8/4',
    accentColor: `hsl(70, 80%, 40%)`,
    height: 40,
  },
  {
    label: 'ProDrive\nCena: 2500zł',
    info: 'ProDrive to prestiżowa szkoła jazdy, znana z wysokiego poziomu nauczania i indywidualnego podejścia do każdego kursanta. Oferujemy elastyczne godziny zajęć oraz nowoczesne samochody szkoleniowe, aby zapewnić komfort i skuteczność nauki. Nasza misja to nie tylko zdanie egzaminu, ale także wychowanie świadomych i odpowiedzialnych kierowców.',
    imagePath: '../../../../assets/course.png',
    aspectRatio: '8/4',
    accentColor: `hsl(70, 80%, 40%)`,
    height: 40,
  },
  {
    label: 'Szkoła Jazdy Turbo\nCena: 2500zł',
    info: 'Szkoła Jazdy Turbo to dynamiczny ośrodek, który kładzie nacisk na praktyczne umiejętności i pewność siebie za kierownicą. Dzięki naszym intensywnym kursom i profesjonalnym instruktorom, nasi kursanci szybko opanowują techniki jazdy i zdobywają niezbędne doświadczenie, aby czuć się pewnie na drodze. Nasze motto to "Prędkość w nauce, bezpieczeństwo na drodze".',
    imagePath: '../../../../assets/course.png',
    aspectRatio: '8/4',
    accentColor: `hsl(70, 80%, 40%)`,
    height: 40,
  },
];

@Component({
  selector: 'app-choose-school',
  templateUrl: './choose-school.component.html',
  styleUrls: ['./choose-school.component.css'],
})
export class ChooseSchoolComponent extends BaseStep implements OnInit {
  schoolCards: CardDetails[] = MOCK_SCHOOL_CARDS;
  category: string = '';

  constructor() {
    super();
  }

  ngOnInit() {}
}
