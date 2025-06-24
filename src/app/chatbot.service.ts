import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private apiUrl = 'https://new-world.runasp.net/api/ChatBot/gemini';

  constructor(private http: HttpClient) {}

  sendMessage(message: string) {
    console.log("Sending message to backend: ", message);
    return this.http.post<any>(this.apiUrl, { question: message });
  }
}
