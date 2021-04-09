import { Component, OnInit } from '@angular/core';
import { GlobalVariable } from '../../Global-variable';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers:[GlobalVariable]
})

export class NavbarComponent implements OnInit {
  
  constructor(public global:GlobalVariable ) { }

  ngOnInit(): void {
    
  }

}
