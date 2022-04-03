import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InspectionApiService {

  readonly inspectionAPIUrl = "https://localhost:7136/api";
  constructor(private http: HttpClient) { }

  // Inspection CRUD
  getInspectionList(): Observable<any[]> {
    return this.http.get<any>(this.inspectionAPIUrl + '/inspections');
  }
  addInspection(data: any) {
    return this.http.post(this.inspectionAPIUrl + '/inspections', data);
  }
  updateInspection(id: number | any, data: any) {
    return this.http.put(this.inspectionAPIUrl + `/inspections/${id}`, data);
  }
  deleteInspection(id: number | string) {
    return this.http.delete(this.inspectionAPIUrl + `/inspections/${id}`);
  }

// InspectionTypes CRUD
getInspectionTypesList(): Observable<any[]> {
  return this.http.get<any>(this.inspectionAPIUrl + '/inspectionTypes');
}
addInspectionTypes(data: any) {
  return this.http.post(this.inspectionAPIUrl + '/inspectionTypes', data);
}
updateInspectionTypes(id: number | any, data: any) {
  return this.http.put(this.inspectionAPIUrl + `/inspectionTypes/${id}`, data);
}
deleteInspectionTypes(id: number | string) {
  return this.http.delete(this.inspectionAPIUrl + `/inspectionTypes/${id}`);
}
 // Status CRUD
 getStatusList(): Observable<any[]> {
  return this.http.get<any>(this.inspectionAPIUrl + '/Status');
}
addStatus(data: any) {
  return this.http.post(this.inspectionAPIUrl + '/Status', data);
}
updateStatus(id: number | any, data: any) {
  return this.http.put(this.inspectionAPIUrl + `/Status/${id}`, data);
}
deleteStatus(id: number | string) {
  return this.http.delete(this.inspectionAPIUrl + `/Status/${id}`);
}




}
