import { Component, OnInit } from '@angular/core';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css']
})
export class NotesListComponent implements OnInit {

  notes: any[] = [];
  filters: any[] = [];
  constructor(private noteService: NotesService) { }

  ngOnInit(): void {
    // Inititalize the Nodes incoming from Service
    this.noteService.getNotes()
      .subscribe((results) => {
        for(var topic in results) {
          let topicStr = topic.replace("#", "");
          this.filters.push(topicStr)
          this.notes.push({
            "Topic": topicStr,
            "Notes": results[topic]
          });
        }
      }, (error) => {
        console.error("Error orccured: " + error);
      });
  }

}