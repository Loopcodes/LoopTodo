import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  TodoList: AngularFireList<any>;
  constructor(private firebasedb: AngularFireDatabase) { }
  getToDoList() {
    this.TodoList = this.firebasedb.list('tasklist');
    return this.TodoList;
  }

  addTask(title: string) {
    this.TodoList.push({
      title: title,
      isChecked: false  
    });
  }
  checkOrUnCheckTask($key: string, flag: boolean) {
    this.TodoList.update($key, {isChecked: flag});
  }

  removeTask($key: string) {
    this.TodoList.remove($key);
  }
}
