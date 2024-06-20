import { Component, OnInit, ElementRef, Renderer2, ViewChild, AfterViewInit  } from '@angular/core';
import { DBServices } from '../db.services';
import { trigger, state, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'app-ipad',
  templateUrl: './ipad.component.html',
  styleUrls: ['./ipad.component.css'],
  animations: [
    trigger('fadeInRightBig', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translate3d(100%, 0, 0)' }),
        animate('1.5s', style({ opacity: 1, transform: 'translate3d(0, 0, 0)' }))
      ])
    ])
  ]
})
export class IpadComponent implements OnInit, AfterViewInit {
  @ViewChild('topButton') topButton!: ElementRef;
  constructor(private services: DBServices, private renderer: Renderer2){}
  ipadData: any;
  isLoading: boolean = true;
  ngOnInit(): void {
    this.getData();
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }
  getData() {
    this.services.getAllDataIpad()
      .subscribe((response:any) => {
        this.ipadData =  response.data;
      });
  }
  ngAfterViewInit(): void {
    window.addEventListener('scroll', () => {
      if (window.scrollY >= 500) {
        this.renderer.setStyle(this.topButton.nativeElement, 'opacity', '1');
      } else {
        this.renderer.setStyle(this.topButton.nativeElement, 'opacity', '0');
      }
    });
  }
  count: number = 0;

  clickPlus() {
    this.count++;
  }
  clickMinus() {
    this.count--;
}
addToCart(ipad: any) {

  const cartItemsStr = localStorage.getItem('cartItems');
  let cartItems: any[] = [];
  if (cartItemsStr) {
    cartItems = JSON.parse(cartItemsStr);
  }


  if (this.count > 0) {

    for (let i = 0; i < this.count; i++) {
      cartItems.push(ipad);
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    location.reload();


  } else {
    console.log('Count must be greater than zero to add to cart.');
  }

}
scrollToTop() {
  const element = document.getElementById('ipad-video');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}
}

