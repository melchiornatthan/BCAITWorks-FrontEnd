import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit{
  constructor(
    private taskService: TaskService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute
  ) { }
  tasks : any;
  ngOnInit(): void {
      this.getTasks();

      this.activatedRoute.queryParams.subscribe(params => {
        if (params['save'] !== undefined && params['save'] === 'true') {
          this.toastr.success('Task saved successfully');
        }
      });
  }

  getTasks = () => {
    this.taskService.getAll().subscribe({
      next: (data) => {
        this.tasks = data;
      },
      error: (error) => {
        this.toastr.error('Unable to fetch tasks');
        throw error;
    },
    });
  };

  updateTask = (id: string) => {
    this.taskService.update(id).subscribe({
      next: () => {
        this.toastr.success('Task updated!');
        this.getTasks();
      },
      error: (error) => {
        this.toastr.error('Failed to update task');
        throw error;
      },
    });
  }

}
