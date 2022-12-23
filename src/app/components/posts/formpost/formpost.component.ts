import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from '../../../services/crud.service';
import { GlobalVariable } from '../../../Global-variable';
import { Router } from '@angular/router'

@Component({
  selector: 'app-formpost',
  templateUrl: './formpost.component.html',
  styleUrls: ['./formpost.component.scss'],
  providers:[GlobalVariable]
})

export class FormpostComponent implements OnInit {
  form:UntypedFormGroup;
  public id:number;
  public postInfo:any;
  public ratingOptions:any = [1,2,3,4,5];
  public isUpdatePost=false;
  public loggedUser:any;
  public alertMessage:string = "&nbsp";
  public success:boolean = false;
  public newPost:object = { id: "", postedById: "", postedByName:"",titlePost:"",subtitlePost:"",bodyPost:"",
  imgUrl:"",rating:1}
    

  constructor(public router:Router,public route:ActivatedRoute,public crudService:CrudService,public global:GlobalVariable) {
    this.loggedUser = global.loggedUser
  }

  ngOnDestroy() { 
  }

  ngOnInit(): void {
    this.getUrlId();

    this.form = new UntypedFormGroup({
      titlePost: new UntypedFormControl('',[
      Validators.required,
        Validators.maxLength(50)
      ]),
      bodyPost: new UntypedFormControl('',[
        Validators.required,
        Validators.maxLength(500)
      ]),
      subtitlePost: new UntypedFormControl('',[
        Validators.required,
        Validators.maxLength(100)
      ]),
      imgUrl: new UntypedFormControl('',[
        Validators.required
      ]),
      rating: new UntypedFormControl('',[
        Validators.required
      ])
    });
  }
  getUrlId():void{
    this.route.queryParams.subscribe(params => {
      this.id = params.id;

      if(this.id){
        this.getPostInfoById(); 
        this.isUpdatePost = true; 
      }else{
        this.isUpdatePost = false;
      }

    });
  }

  getPostInfoById():void{
    var subs = this.crudService.getDataById(this.id).subscribe((data)=>{
      this.postInfo = data;
      console.log(this.postInfo);

      this.form.setValue({
        titlePost: this.postInfo.titlePost,
        bodyPost: this.postInfo.bodyPost,
        subtitlePost: this.postInfo.subtitlePost,
        imgUrl: this.postInfo.imgUrl,
        rating: this.postInfo.rating
      }); 
    });

    

  }
  
  createPost():void{
    var finalPost:any = this.form.value;

    finalPost.postedById = this.loggedUser.id;
    finalPost.postedByName = this.loggedUser.name;
    this.crudService.postData(finalPost);
    this.alertMessage = "Post created succesfully!";
    this.success = true;
    this.form.reset(this.newPost);
    setTimeout(()=>{
      this.success = false;
    },5000);    
  }

  updatePost():void{
    var finalPost:any = this.form.value;

    finalPost.postedById = this.loggedUser.id;
    finalPost.postedByName = this.loggedUser.name;
    this.crudService.updatePost(this.postInfo.id,finalPost);
    this.alertMessage = "Post Updated sucessfully!";
    this.success = true;
    setTimeout(()=>{
      this.success = false;
    },5000); 
  }
  

}
