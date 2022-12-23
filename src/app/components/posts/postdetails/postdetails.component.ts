import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { CrudService } from '../../../services/crud.service'
import { faStar } from '@fortawesome/fontawesome-free';
import { GlobalVariable } from '../../../Global-variable';
import { Router } from '@angular/router'

@Component({
  selector: 'app-postdetails',
  templateUrl: './postdetails.component.html',
  styleUrls: ['./postdetails.component.scss'],
  providers:[GlobalVariable]
})

export class PostdetailsComponent implements OnInit {
  public id:number;
  public postedById:number;
  public image:string;
  public title:string;
  public subtitle:string;
  public postedName:string;
  public bodyPost:string;
  public postDetails:any;
  public rating:number;
  public starRating:number[];
  public userLogged:boolean = false;
  star = faStar;

  constructor(private router:Router,private route: ActivatedRoute,private crudService: CrudService,private global:GlobalVariable) { }

  ngOnInit(): void {
    this.getUrlId();

  }

  isPostFromUserLogged(){
    console.log(this.global.loggedUser.id);
    console.log(this.postedById);
    this.userLogged = this.global.loggedUser.id == this.postedById ? true:false;
  }

  deletePost(){
    var response = confirm("Are you sure you want to delete this post?")

    if(response){
      this.crudService.deletePost(this.id);
      this.router.navigate(['/posts']).then(()=>window.location.reload);
    }
  }

  modifyPost(){
    this.router.navigate(['/postform'],{queryParams:{id:this.id}});
  }

  getUrlId(){
    this.route.queryParams.subscribe(params => {
      console.log(params.id);
      this.id = params.id;
    })
    this.getPostById();
  }

  getPostById(){
    this.crudService.getDataById(this.id).subscribe((response)=>{
      console.log(response)
      this.postDetails = response;
      this.title = this.postDetails.titlePost;
      this.subtitle = this.postDetails.subtitlePost;
      this.bodyPost = this.postDetails.bodyPost;
      this.postedName = this.postDetails.postedByName;
      this.postedById = this.postDetails.postedById;
      this.image = this.postDetails.imgUrl;
      this.starRating = Array(this.postDetails.rating).fill(0).map((x,i)=>i);

      this.isPostFromUserLogged();
    });
  }

}
