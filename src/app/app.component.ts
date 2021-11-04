import { Component, OnInit } from '@angular/core';
import { CursosService } from './services/cursos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  constructor(private cursosService: CursosService){}

  ngOnInit(): void{
    this.cursosService.cursos
    .subscribe(res => console.log(res));
  }
}
