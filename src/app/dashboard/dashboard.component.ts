import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private afs: AngularFirestore
  ) { }

  ngOnInit() {
  }

  addList() {
    this.afs.doc('user/1').set({id: 12, name: 'bob'});
  }

}
