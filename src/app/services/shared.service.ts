// shared.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private _tasks = new BehaviorSubject<string[]>([]);
  private _taskUpdateSubject = new Subject<void>();

  get tasks(): Observable<string[]> {
    return this._tasks.asObservable();
  }

  get taskUpdate$(): Observable<void> {
    return this._taskUpdateSubject.asObservable();
  }

  updateTasks(newTasks: string[]): void {
    this._tasks.next(newTasks);
    this._taskUpdateSubject.next();
  }

  notifyTasksChanged(): void {
    this._taskUpdateSubject.next();
  }
}
