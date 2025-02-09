import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';

import { StudentsTableComponent } from '../students-table/students-table.component';
import { StudentRecordsComponent } from "../student-records/student-records.component";
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,
    MatTabsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    StudentsTableComponent,
    StudentRecordsComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  userName: string = '';

  // To extract first letter of username
  nickName: string = '';

  constructor(private cookieService: CookieService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
      this.userName = this.cookieService.get('userName');
      if(this.userName != ''){
        this.nickName = this.userName.charAt(0).toUpperCase();
      }
  }

  logout(){
    console.log('traitement');
    this.authService.logOut();
  }
}
