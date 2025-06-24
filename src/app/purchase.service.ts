import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  private apiUrl = 'https://new-world.runasp.net/api/Ordered/confirm';

  constructor(private http: HttpClient) {}

  confirmPurchase(purchaseData: any): Observable<any> {
    Swal.fire({
  title: "Done!",
  text: "purchase process has been completed successfully",
  icon: "success"
});
    return this.http.post(this.apiUrl, purchaseData);

  }
}
