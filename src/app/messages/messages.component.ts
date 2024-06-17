import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Message } from "../model/message";
import { tap } from "rxjs/operators";
import { MessagesService } from "./messages.service";

@Component({
  selector: "messages",
  templateUrl: "./messages.component.html",
  styleUrls: ["./messages.component.css"],
})
export class MessagesComponent implements OnInit {
  showMessage = false;
  errors$: Observable<string[]>;
  constructor(public messagesService: MessagesService) {
    console.log("Create message component");
  }

  ngOnInit() {
    this.errors$ = this.messagesService.errors$.pipe(
      tap(() => {
        console.log("inside tab")
        this.showMessage = true;
      })
    );
  }

  onClose() {
    this.showMessage = false;
  }
}
