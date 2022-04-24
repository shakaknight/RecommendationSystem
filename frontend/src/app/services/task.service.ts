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

  editTask(id:string,title: string,completed:boolean) {
    // We want to send a web request to create a task
    return this.taskWebRequestService.patch(`taskUpdate/${id}`, {title: title,completed:false });
  }

  
  deleteTask(id: string) {
    return this.taskWebRequestService.delete(`task/${id}`);
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


  // WPR 
  submitWPR(email:String,no: Number,target:String, achieve:String,future:String,link:String){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
    console.log(dd,mm,yyyy)
    // if(dd<10 && mm ) 
    // {
    //     var ddd='0'+dd;
    // } 

    // if(mm<10) 
    // {
    //     var mmm='0'+mm;
    // } 
    var date = dd+'-' +mm+'-'+yyyy;
    console.log(date)
    return this.taskWebRequestService.post(`submit-wpr`,{
      email: email,
      no: no,
      target: target,
      achieve: achieve,
      future: future,
      link: link,
      date: date
    })
  }
  getWPRs(email:String){
    return this.taskWebRequestService.get(`get-wpr/${email}`);
  }

  changeStatus(_id:String,status:String){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
    console.log(dd,mm,yyyy)
    var date = dd+'-' +mm+'-'+yyyy;
    console.log(date)
    return this.taskWebRequestService.patch(`updateWPR`,{
      _id:_id,
      reviewDate:date,
      remarks:status,
    })
  }

  deleteWPR(id:any) {
    return this.taskWebRequestService.delete(`delete-wpr/${id}`);
  }

  submitProblem(email:String, problem:String,fields: String){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
    console.log(dd,mm,yyyy)
    var date = dd+'-' +mm+'-'+yyyy;
    console.log(date)
    return this.taskWebRequestService.post(`submit-problem`,{
       email: email,
       problem: problem,
       fields: fields,
       date: date
    })
  }

  getProblems(id:String){
    return this.taskWebRequestService.get(`get-problem/${id}`);
  }

  getAllProblems(){
    return this.taskWebRequestService.get('get-problems');
  }

  deleteProblem(id:any) {
    return this.taskWebRequestService.delete(`delete-problem/${id}`);
  }

  getSolutions(id:String){
    return this.taskWebRequestService.get(`get-solution/${id}`);
  }

  submitSolution(id:String,email:String, target:String,future:String,upload:String){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
    console.log(dd,mm,yyyy)
    var date = dd+'-' +mm+'-'+yyyy;
    console.log(date)
    return this.taskWebRequestService.post(`submit-solution`,{
       id:id,
       email: email,
       target: target,
       future: future,
       upload: upload,
       date: date
    })
  }

  submitMeeting(mentorId:String,menteeId:String, link:String,date:String,time:String){
    return this.taskWebRequestService.post(`submit-meeting`,{
    mentorEmail: mentorId,
    menteeEmail: menteeId,
    link: link,
    time: time,
    date: date
    })
  }

  getMeeting(id:String){
    return this.taskWebRequestService.get(`get-meeting/${id}`);
  }

  getMeetingMentee(id:String){
    return this.taskWebRequestService.get(`get-meeting-mentee/${id}`);
  }

  deleteMeeting(id:any) {
    return this.taskWebRequestService.delete(`delete-meeting/${id}`);
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