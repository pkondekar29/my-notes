import { Component, OnInit } from '@angular/core';
import { NotesService } from '../services/notes.service';
import { MatTableDataSource } from '@angular/material/table';

export interface NoteElement {
   Note: string;
   Tags: string[];
   Course: string;
}

@Component({
   selector: 'app-notes-list',
   templateUrl: './notes-list.component.html',
   styleUrls: ['./notes-list.component.css']
})
export class NotesListComponent implements OnInit {

   dataSource = new MatTableDataSource();
   notes: any[] = [];
   filters: any[] = [];
   courses: any[] = [];
   displayedColumns: string[] = ['note', 'course'];

   constructor(private noteService: NotesService) { }

   ngOnInit(): void {
      // Inititalize the Nodes incoming from Service
      this.noteService.getNotes()
         .subscribe((results) => {
            this.notes.push(results);
            for (var i in results) {
               if (!(results[i].Course in this.courses)) {
                  this.courses.push(results[i].Course);
               }
               for (var j in results[i].Tags) {
                  if (!(results[i].Tags[j] in this.filters)) {
                     this.filters.push(results[i].Tags[j]);
                  }
               }
            }

            this.dataSource.data = results;
         }, (error) => {
            console.error("Error orccured: " + error);
         });
   }

}