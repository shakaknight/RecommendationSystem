import { Injectable } from '@angular/core';
import { TaskWebRequestService } from './task-web-request.service';
import { WebRequestService } from './web-request.service' ;
import {Task} from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webRequestService: WebRequestService, private taskWebRequestService:TaskWebRequestService) { }
  predict(profession:any){
    //we want the predicted list of mentors
    return this.webRequestService.post(`predict`,profession);
  }

   search(name:any){
    //we want the predicted list of mentors
    return this.webRequestService.post(`search`,name);
  }

  createTask(title: string) {
    // We want to send a web request to create a task
    return this.taskWebRequestService.post(`task`, { title });
  }

  //task web request
   getTask() {
    return this.taskWebRequestService.get('task');
  }

  getMentee() {
    return this.taskWebRequestService.post(`request-mentee`,{
      email: localStorage.getItem('user-email')
    });
  }

  deleteTask(id: string) {
    return this.taskWebRequestService.delete(`task/${id}`);
  }

  getUserInfo(email_id:any){
    return this.taskWebRequestService.post(`user-info`,{
      email: email_id
    })
  }

  requestMentor(mentor: String, mentee:String){
    return this.taskWebRequestService.post(`request-mentor`,{
      mentor_email: mentor,
      mentee_email: mentee
    })
  }

  deleteRequest(id:any) {
    return this.taskWebRequestService.delete(`delete-request/${id}`);
  }

  acceptMentor(mentor:String,mentee:String,request:any){
    console.log(!request.status)
    return this.taskWebRequestService.patch(`acceptMentor`,{
      mentor_email: mentor,
      mentee_email: mentee,
      status: !request.status
    })
  }

  complete(task: Task) {
    return this.taskWebRequestService.patch(`taskUpdate/${task._id}`, {
      completed: !task.completed
    });
  }

  setMentor(email:String,mentor_email:String){
    return this.taskWebRequestService.patch(`setMentor`,{
      email: email,
      member_email: mentor_email
    })
  }

  getResources() {
    return this.taskWebRequestService.get('resources');
  }

  createResource(title:String,pages:String,link:String){
      return this.taskWebRequestService.post(`create-resource`,{
      title: title,
      pages: pages,
      link: link,
    })
  }

  getPublications() {
    return this.taskWebRequestService.get('publications');
  }

  createPublication(title:String,link:String){
      return this.taskWebRequestService.post(`create-publication`,{
      title: title,
      link: link
    })
  }

  getRequests(){
    return this.taskWebRequestService.get('getRequests');
  }

}



  // //task web request
  //  getLists() {
  //   return this.taskWebRequestService.get('lists');
  // }

  // createList(title: string) {
  //   // We want to send a web request to create a list
  //   return this.taskWebRequestService.post('lists', { title });
  // }

  // updateList(id: string, title: string) {
  //   // We want to send a web request to update a list
  //   return this.taskWebRequestService.patch(`lists/${id}`, { title });
  // }

  // updateTask(listId: string, taskId: string, title: string) {
  //   // We want to send a web request to update a list
  //   return this.taskWebRequestService.patch(`lists/${listId}/tasks/${taskId}`, { title });
  // }

  // deleteTask(listId: string, taskId: string) {
  //   return this.taskWebRequestService.delete(`lists/${listId}/tasks/${taskId}`);
  // }

  // deleteList(id: string) {
  //   return this.taskWebRequestService.delete(`lists/${id}`);
  // }

  // getTasks(listId: string) {
  //   return this.taskWebRequestService.get(`lists/${listId}/tasks`);
  // }

  // createTask(title: string, listId: string) {
  //   // We want to send a web request to create a task
  //   return this.taskWebRequestService.post(`lists/${listId}/tasks`, { title });
  // }

  // complete(task: Task) {
  //   return this.taskWebRequestService.patch(`lists/${task._listId}/tasks/${task._id}`, {
  //     completed: !task.completed
  //   });
  // }