import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

const baseurl = 'https://taskmean.herokuapp.com';

@Injectable()
export class TaskService {

  result: any;
  constructor(private _http: Http) { }
  // Get all tasks
  getTasks() {
    return this._http.get(baseurl + '/api/posts')
      .map(result => this.result = result.json())
  }
  // Get 1 task
  getTask(id) {
    return this._http.get(baseurl + '/api/details/' + id)
      .map(task => task.json())
  }
  // Add a task
  addTask(task) {
    let headers = new Headers({ 'Content-Type': 'application/json' })
    let options = new RequestOptions({ headers: headers })
    return this._http.post(baseurl + '/api/posts', JSON.stringify(task), options).map(res => res.json())
  }
  // Edit a task
  editTask(id, newname) {
    let newtask = {
      id: id,
      taskupdate: {
        "name": newname
      }
    }
    return this._http.put(baseurl + '/api/update', newtask).map(res => res.json())
  }
  // Delete a Task
  deleteTask(id) {
    return this._http.delete(baseurl + '/api/delete/' + id)
      .map(res => res.json())
  }
}
