import { Component, OnInit } from '@angular/core';
import { environment } from "../../environments/environment";
import { Router } from "@angular/router";
import { UserService } from "../services/user.service";
import { OfferService} from "../services/offer.service";
import { SessionService } from "../services/session.service";
import { Offer } from "../interfaces/offer-interface";
import { FileUploader } from "ng2-file-upload";
import { User } from '../interfaces/user-interface'

@Component({
  selector: 'app-New-Offer',
  templateUrl: './New-Offer.component.html',
  styleUrls: ['./New-Offer.component.scss']
})
export class NewOfferComponent implements OnInit {

  user:User;

  uploader: FileUploader = new FileUploader({
    url: `${environment.BASEURL}/api/offer/new`
  });

  offer: Offer;

  formOffer = {
    offerTitle: "",
    offerDescription: "",
    price: "",
    address:"",
    city:"",
    postalcode:""
  };

  constructor(public sessionService: SessionService, public router: Router, public userService: UserService, public offerService: OfferService ) { }

  ngOnInit() {
    this.sessionService.isLoggedIn().subscribe(user=>{
      this.user = user
    })
  }

  newOffer(form) {
    //console.log(form.value)
    form.value.id = this.user._id;
    this.offerService.newOffer(form.value).subscribe(data=>{
      console.log('back in the comp')
      console.log(data)
    })



    /* this.uploader.onBuildItemForm = (item, form) => {
      form.append("offerTitle", this.formOffer.offerTitle);
      form.append("offerDescription", this.formOffer.offerDescription);
      form.append("price", this.formOffer.price);
      form.append("postalcode", this.formOffer.postalcode)
    };
    this.uploader.uploadAll()
    this.router.navigate(["/home"]) */

  }
}
