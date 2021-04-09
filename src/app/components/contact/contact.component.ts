import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '../../services/crud.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})

export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  success: boolean = false;
  contact:object = {contactName: "", contactEmail: "", contactSubject: "", contactMessage: ""}

  constructor(private crudService:CrudService) { }

  ngOnInit(): void {
    this.contactForm = new FormGroup({
      contactName: new FormControl('', [Validators.required]),
      contactEmail: new FormControl('',[Validators.required,Validators.email]),
      contactSubject: new FormControl('',Validators.required),
      contactMessage: new FormControl('',Validators.required)
    });
  }

  onSubmit(): void {
    this.crudService.postContactForm(this.contactForm.value).subscribe((response)=> {
      console.log(response);
      this.success = true;
      this.contactForm.reset(this.contact);
      setTimeout(()=>{
        this.success = false;
      },5000);
    },(error)=>{
      alert("Contact form not submitted.");
    });
  }

}
