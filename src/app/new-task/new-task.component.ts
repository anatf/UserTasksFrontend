import { Component, OnDestroy, OnInit } from '@angular/core';
import { Task } from  '../../models/task';
import { Subscription } from 'rxjs';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css'
})
export class NewTaskComponent implements OnInit, OnDestroy{
  newTask: Task = new Task();
  isEditable: boolean = true;
  private subscription!: Subscription;

  constructor(
    private sharedService: SharedService,
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
 
    this.subscription = this.sharedService.taskUpdate$.subscribe(() => {
      this.newTask = new Task();
      this.isEditable = true;
    });
  }

  isTaskEditable(): boolean {
    return true;
  } 
}
