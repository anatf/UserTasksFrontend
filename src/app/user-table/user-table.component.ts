import { Component, OnInit } from '@angular/core';
import { UserWithTaskCount } from '../../models/user';
import { ApiService } from '../../services/api-service';
import { Subscription } from 'rxjs';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css'
})
export class UserTableComponent implements OnInit {
 
  users: UserWithTaskCount[] = [];
  private subscription!: Subscription;


  constructor(
    private apiService: ApiService,
    private sharedService: SharedService
  ) { }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.fetchUsers();

    this.subscription = this.sharedService.taskUpdate$.subscribe(() => {
      this.fetchUsers();
    });
  }

  fetchUsers() {
    this.apiService.getUsers().subscribe(
      (data: UserWithTaskCount[]) => {
        // Handle successful response
        this.users = data;
      },
      (error) => {
        // Handle error
        console.error('Error fetching users:', error);
      }
    );
  }
}
