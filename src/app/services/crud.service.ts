import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})

export class CrudService {
  readonly globalUrl = "http://localhost:3000";
  readonly postsAPI = "/Posts";
  readonly usersAPI = "/Users";
  readonly contactAPI = "/Contact";

  constructor(private http:HttpClient) { }

  //Blog Posts methods
  getData(){
    return this.http.get(this.globalUrl+this.postsAPI);
  }

  getDataById(id:number){
    return this.http.get(this.globalUrl+this.postsAPI+`/${id}`);
  }

  postData(post:Object){
    return this.http.post(this.globalUrl+this.postsAPI,post).subscribe(data => {
      data
    });
  }

  updatePost(id:number,post:Object){
    return this.http.put(this.globalUrl+this.postsAPI+`/${id}`,post).subscribe(data=>{
      data
    });
  }

  deletePost(id:number){
    return this.http.delete(this.globalUrl+this.postsAPI+`/${id}`).subscribe(data => {
      data
    });
  }


  //Contact methods
  postContactForm(contact:Object){
    return this.http.post(this.globalUrl+this.contactAPI,contact);
  }

  

}
