
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Task, TaskWithUserName } from  '../../models/task';
import { ApiService } from '../../services/api-service'
import { Subscription } from 'rxjs';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-task-collection',
  templateUrl: './task-collection.component.html',
  styleUrl: './task-collection.component.css'
})
export class TaskCollectionComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  //newTask: Task = new Task();

  private subscription!: Subscription;


  constructor(
    private apiService: ApiService,
    private sharedService: SharedService
  ) { }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.fetchTasks();

    this.subscription = this.sharedService.taskUpdate$.subscribe(() => {
      this.fetchTasks();
    });
  }

  isTaskEditable(index: number): boolean {
    //if (index==this.tasks.length-1) { return true;}
    return false;
  }

  // Use this method to toggle the editable state of a specific task
  toggleTaskEditMode(index: number): void {
    //this.isEditable[index] = !this.isEditable[index];
  }

  fetchTasks() {
    this.apiService.getTasks().subscribe(
      (data: Task[]) => {
        // Handle successful response
        this.tasks = data;
        //this.tasks.push(new Task());
        
      },
      (error) => {
        // Handle error
        console.error('Error fetching tasks:', error);
      }
    );
  }

}
