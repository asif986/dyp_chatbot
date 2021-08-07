import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input('headername')headername:string;
img = "assets/default.png";
  constructor(    public afstore:AngularFirestore) { }

  ngOnInit() 
  {
     const user = JSON.parse(localStorage.getItem('user'));
    console.log(user.uid);
    this.afstore.collection('students').doc(user.uid).ref.get().then(data=>
    {
       if (data.exists) {
         let datainserted:any = data.data();
         this.img = datainserted.profileLink
    console.log(data.data());
  } else {
    console.log("There is no document!");
  }
    })
  }

}
