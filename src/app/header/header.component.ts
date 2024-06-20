import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.loadCartItems();
  }
  cartItems: any[] = [];
  totalPrice: number = 0;


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
  }
  updateLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }
  showInvoiceFlag = false;
  showInvoice() {
    this.showInvoiceFlag = true;
  }
  hideInvoice() {
    this.showInvoiceFlag = false;
  }
  confirmCheckout() {
    console.log('Checkout confirmed!');
  }
}
