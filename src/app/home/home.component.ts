import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  tasks = [];
  title: string;

  // Edit task
  isEdit: boolean;
  taskName = '';
  taskId: string;


  constructor(private _taskservice: TaskService) { }

  ngOnInit() {
    this._taskservice.getTasks().subscribe(res => this.tasks = res)
  }

  addTask(event) {
    event.preventDefault()
    let newTask = {
      _id: '',
      name: this.title,
      isDone: false
    }
    this.title = ''
    this._taskservice.addTask(newTask).subscribe(res => {
      console.log('addtask ' + res._id)
      newTask._id = res._id
      this.tasks.push(newTask)
    })
  }
  
  delete(event) {
    // Get id of task
    let target = event.target || event.srcElement || event.currentTarget;
    let id = target.id

    // Delete task in tasks
    for (var i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i]._id == id) {
        this.tasks.splice(i, 1);
      }
    }
    // Delete task in database
    this._taskservice.deleteTask(id).subscribe(res => {
      console.log(res)
    })

  }
}
