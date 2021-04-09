import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../services/crud.service'
import { Router } from '@angular/router'
import { faPlus } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})

export class PostsComponent implements OnInit {
  public posts:Object;
  public hideLoader:boolean = true;
  faPlus = faPlus;
  
  constructor(private router:Router,private crudService:CrudService) { 
  
  }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(){
    this.crudService.getData().subscribe(
      (response) => {
        //console.log(response)
        this.posts = response
        console.log(this.posts);
        this.hideLoader = false;
      },(error)=>{

      });
  }

  clickEvent(): void{
    this.router.navigateByUrl('/postform');
}

}
