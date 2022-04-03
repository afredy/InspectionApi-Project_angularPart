import { Component, OnInit } from '@angular/core';
import { map, Observable, observable } from 'rxjs';
import { InspectionApiService } from 'src/app/inspection-api.service'

@Component({
  selector: 'app-show-inspection',
  templateUrl: './show-inspection.component.html',
  styleUrls: ['./show-inspection.component.css']
})
export class ShowInspectionComponent implements OnInit {

  inspectionList$!: Observable<any[]>;
  inspectionTypesList$!: Observable<any[]>;
  inspectionTypesList: any = [];

  //Map to display data associate with foreign keys
  inspectionTypesMap: Map<number, string> = new Map();

  constructor(private service: InspectionApiService) { }

  ngOnInit(): void {
    this.inspectionList$ = this.service.getInspectionList();
    this.inspectionTypesList$ = this.service.getInspectionTypesList();
    this.refreshInspectionTypesMap();
  }

  //variables (properties)
  modalTitle: string = '';
  IsActive: boolean = false;
  inspection: any;

  modalAdd() {

    this.inspection = {
      id: 0,
      status: null,
      comments: null,
      inspectionTypeid: null
    }
    this.modalTitle = 'Add Inspection';
    this.IsActive = true;

  }
  modalEdit(item: any) {
    this.inspection = item;
    this.modalTitle = "Edit Inspection";
    this.IsActive = true;

  }


  modalClose() {
    this.IsActive = false;
    this.inspectionList$ = this.service.getInspectionList();
  }

  delete(item: any) {
    if (confirm(`Are you sure you want to delete inspection ${item.id}`)) {
      this.service.deleteInspection(item.id).subscribe(res => {
        //------------------------------

        var closeModalBtn = document.getElementById('add-edit-modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }

        var showDeleteSuccess = document.getElementById('delete-success-alert');
        if (showDeleteSuccess) {
          showDeleteSuccess.style.display = "block";
        }
        setTimeout(() => {
          if (showDeleteSuccess) {
            showDeleteSuccess.style.display = "none";
          }
        }, 4000);
        this.inspectionList$ = this.service.getInspectionList();
        //------------------------------


      })
    }


  }
  refreshInspectionTypesMap() {
    this.service.getInspectionTypesList().subscribe(data => {
      this.inspectionTypesList = data;
      for (let i = 0; i < data.length; i++) {
        this.inspectionTypesMap.set(this.inspectionTypesList[i].id, this.inspectionTypesList[i].inspectionName);
      }

    })

  }
}
