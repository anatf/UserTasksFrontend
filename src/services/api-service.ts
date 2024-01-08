import { Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { urlBase } from "../environments/environment";
import { Task, TaskWithUserName } from '../models/task';
import { User, UserWithTaskCount } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }


    getTasksFull(): Observable<TaskWithUserName[]> {
      return this.http.get<TaskWithUserName[]>(urlBase + 'api/Tasks/withUserNames');
    }
  
    getTasks(): Observable<Task[]> {
      return this.http.get<Task[]>(urlBase + 'api/Tasks');
    }

    getUsers() : Observable<UserWithTaskCount[]> {
      return this.http.get<UserWithTaskCount[]>(urlBase+ 'api/Users/withTaskCount');
    }

    addTask(item: any) : Observable<Task> {
      return this.http.post<Task>(urlBase + 'api/Tasks', item);
    }

    getAllUsers() : Observable<User[]> {
      return this.http.get<User[]>(urlBase+ 'api/Users/Users');
    }
}
