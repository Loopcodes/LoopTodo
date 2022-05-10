import { Component, OnInit } from '@angular/core';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers:[CrudService]
})
export class DashboardComponent implements OnInit {
  TodoListArray: any[];
  constructor(private crudService:CrudService) { }

  ngOnInit(): void {
    this.crudService.getToDoList().snapshotChanges()
    .subscribe(item => {
      this.TodoListArray = [];
      item.forEach(element => {
        var x = element.payload.toJSON();
        x["$key"] = element.key;
        this.TodoListArray.push(x);
      })

      this.TodoListArray.sort((a,b) => {
        return a.isChecked - b.isChecked;
      })
    });
  }

  onAdd(itemTask) {
    this.crudService.addTask(itemTask.value);
    itemTask.value = null;
  }

  alterCheck($key: string, isChecked) {
    this.crudService.checkOrUnCheckTask($key,!isChecked);
  }

  onDelete($key: string) {
    this.crudService.removeTask($key);
  }

}
