import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  cartItems: any[] = [];
  totalPrice: number = 0;
  showInvoiceFlag: boolean = false;
  apiUrl = 'https://localhost:7054/api/Purchased';

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loadCartItems();
  }



  loadCartItems() {
    const cartItemsStr = localStorage.getItem('cartItems');
    if (cartItemsStr) {
      this.cartItems = JSON.parse(cartItemsStr);
      this.calculateTotalPrice();
    }
  }

  calculateTotalPrice() {
    this.totalPrice = this.cartItems.reduce((total, item) => total + item.price, 0);
  }
  removeFromCart(index: number) {
    this.cartItems.splice(index, 1);
    this.updateLocalStorage();
    this.calculateTotalPrice();
    if (this.cartItems.length === 0) {
      localStorage.removeItem('cartItems');
    }
  }
  updateLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

   showInvoice() {
     this.showInvoiceFlag = true;
  }

  hideInvoice() {
    this.showInvoiceFlag = false;
  }
  confirm() {
    const login = localStorage.getItem('logincheck');

    if (login) {
      console.log('User is signed in, navigating to /Checkout');
      this.router.navigate(['/Checkout']);
    } else {
      console.log('User not signed in, navigating to /SignIN');
      this.router.navigate(['/SignIN']);
    }
  }


}
