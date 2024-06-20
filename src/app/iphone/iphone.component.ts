import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { DBServices } from '../db.services';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-iphone',
  templateUrl: './iphone.component.html',
  styleUrls: ['./iphone.component.css'],
  animations: [
    trigger('fadeInRightBig', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translate3d(100%, 0, 0)' }),
        animate('1.5s', style({ opacity: 1, transform: 'translate3d(0, 0, 0)' }))
      ])
    ])
  ]
})
export class IphoneComponent implements OnInit, AfterViewInit {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef;
  @ViewChild('topButton') topButton!: ElementRef;


  iphoneData: any;
  count: number = 0;
  isLoading: boolean = true;

  constructor(private services: DBServices, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.getData();
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

  getData() {
    this.services.getAllDataIphone()
      .subscribe((response: any) => {
        this.iphoneData = response.data;
      });
  }

  ngAfterViewInit(): void {
    if (this.videoPlayer && this.videoPlayer.nativeElement) {
      this.videoPlayer.nativeElement.addEventListener('canplay', () => {
        this.muteVideo();
      });
    }
    window.addEventListener('scroll', () => {
      if (window.scrollY >= 500) {
        this.renderer.setStyle(this.topButton.nativeElement, 'opacity', '1');
      } else {
        this.renderer.setStyle(this.topButton.nativeElement, 'opacity', '0');
      }
    });
  }

  muteVideo(): void {
    if (this.videoPlayer && this.videoPlayer.nativeElement) {
      this.videoPlayer.nativeElement.muted = true;
      console.log('Video muted:', this.videoPlayer.nativeElement.muted);
    }
  }



  clickPlus() {
    this.count++;
  }

  clickMinus() {
    this.count--;
  }

  addToCart(iphone: any) {
    const cartItemsStr = localStorage.getItem('cartItems');
    let cartItems: any[] = [];
    if (cartItemsStr) {
      cartItems = JSON.parse(cartItemsStr);
    }

    if (this.count > 0) {
      for (let i = 0; i < this.count; i++) {
        cartItems.push(iphone);
      }
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      location.reload();
    } else {
      console.log('Count must be greater than zero to add to cart.');
    }
  }
  scrollToTop() {
    const element = document.getElementById('iphone-video');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

}
