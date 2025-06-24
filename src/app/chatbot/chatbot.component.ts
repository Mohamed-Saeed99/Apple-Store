import { Component, OnInit } from '@angular/core';
import { ChatbotService } from '../chatbot.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {

  message: string = '';
  botReply: string = '';
  isLoading: boolean = false;

  constructor(private chatbotService: ChatbotService) {}
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }
  sendMessage() {
    if (!this.message.trim()) {
      console.log("Message is empty, not sending.");
      return;
    }

    this.isLoading = true;
    console.log("Sending message: ", this.message);

    this.chatbotService.sendMessage(this.message).subscribe({
      next: (res) => {
        console.log("Response from backend: ", res);
        this.botReply = res.answer;
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Error during request: ", err);
        this.botReply = 'Error: Failed to connect to server';
        this.isLoading = false;
      }
    });
  }



}
