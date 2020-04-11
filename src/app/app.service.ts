import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { UserEntryModel } from './interfaces/userEntry';

@Injectable()
export class AppService {
  base_url: string = "http://mybackend.com/api/";
  tasks_endpoint = "userEntries";
  constructor(private http: HttpClient) { }

  //Gets all tasks
  getTasks() {
    return this.http
      .get(this.base_url + this.tasks_endpoint)
  } //getTasks

  //Creates a task
  createUserEntry(userEntry: UserEntryModel) {
    return this.http
      .post(this.base_url + this.tasks_endpoint, userEntry)
  } //createTask

  //   //Updates a Task
  //   updateTask(update) {
  //     return this.http
  //       .put(this.base_url + this.tasks_endpoint, update)
  //       .map(res => res.json());
  //   } //updateTask

  //   //Deletes a Task
  //   deleteTask(taskId) {
  //     return this.http
  //       .delete(`${this.base_url + this.tasks_endpoint}/${taskId}`)
  //       .map(res => res.json());
  //   } //deleteTask
}