import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';


@Component({
  selector: 'app-socialshare',
  templateUrl: './socialshare.page.html',
  styleUrls: ['./socialshare.page.scss'],
})
export class SocialsharePage implements OnInit {
 
 
  //////
  link: string='https://link.medium.com/JA4amAHFJ5'
  text: string='Flamenco'
  imgurl:string= 'http://res.cloudinary.com/dlmebnxnv/image/upload/v1632245783/oa4mx6tg1fi4u4gejthp.jpg'
  
  constructor(private modal: ModalController,private socialSharing: SocialSharing) { }

  ngOnInit() {
    
  }
  closeModal() {
    this.modal.dismiss();
  }
  ShareWhatsapp(){
    this.socialSharing.shareViaWhatsApp(this.text, this.imgurl, this.link)
  }

  ShareFacebook(){
    this.socialSharing.shareViaFacebookWithPasteMessageHint(this.text, this.imgurl, null /* url */)
  }

  SendEmail(){
    this.socialSharing.shareViaEmail('text', 'subject', ['email@address.com'])
  }

  SendTwitter(){
    this.socialSharing.shareViaTwitter(this.text, this.imgurl, this.link)
  }

  SendInstagram(){
    this.socialSharing.shareViaInstagram(this.text, this.imgurl)
  }


  
  
}
