import { Component, Input } from '@angular/core';
import { Task } from '../../models/task';
import { UserWithTaskCount } from '../../models/user';
import { ApiService } from '../../services/api-service'; // Import and use your user service
import { Observable } from 'rxjs';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  @Input() task: Task = new Task();
  @Input() isEditable = false;
  users: UserWithTaskCount[] = [];// Assume you have a users array

  constructor(private apiService: ApiService,
              private sharedService: SharedService) 
              {} 

  ngOnInit() {
    // Initialize or fetch the list of users
    //this.users = this.apiService.getUsers();
    this.fetchUsers();
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

  toggleEditMode(): void {
    this.isEditable = !this.isEditable;

  }

  saveChanges(): void {
    
    //this.isEditable = false;

    const formData = this.task;
    this.apiService.addTask(formData).subscribe({
      next: (_response) => {
        
        if ((_response as any)?.success==false) {
          const message = (_response as any)?.message; 
          alert(message);
        } 
          
        this.sharedService.notifyTasksChanged();  
      },
      error: (_response) => {
        if (_response.status === 400) {
          alert(_response.error.errors);
          console.log(_response.error.errors)
        } else {
          alert('Task added successfully');
          console.log(_response)
        }
      },
    });
  }

  cancelEdit(): void {
    // Implement cancel logic here
    // You may want to revert changes or reset the form
    this.isEditable = false;
  }

  getUserById(userId: number): any {
    // Implement logic to get user by id from the users array
    return this.users.find(user => user.id === userId);
  }
}