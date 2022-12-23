import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { CrudService } from '../../services/crud.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})

export class ContactComponent implements OnInit {
  contactForm: UntypedFormGroup;
  success: boolean = false;
  contact:object = {contactName: "", contactEmail: "", contactSubject: "", contactMessage: ""}

  constructor(private crudService:CrudService) { }

  ngOnInit(): void {
    this.contactForm = new UntypedFormGroup({
      contactName: new UntypedFormControl('', [Validators.required]),
      contactEmail: new UntypedFormControl('',[Validators.required,Validators.email]),
      contactSubject: new UntypedFormControl('',Validators.required),
      contactMessage: new UntypedFormControl('',Validators.required)
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
