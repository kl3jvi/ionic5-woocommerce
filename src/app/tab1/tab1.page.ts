import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { WooCommerceService } from 'src/app/services/woocommerce.service';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  latitude: any = 0; //latitude
  longitude: any = 0; //longitude
  public getProducts;
  optionse = {
    slidesPerView: 3.15,
    spaceBetween: 0.2,
  }
  slideOpts = {
    slidesPerView: 1.1,
    spaceBetween: 4 
  };
  constructor(private geolocation: Geolocation,
    public woocommerceService: WooCommerceService,
    private http: HttpClient,
    private route: Router) {
    this.getProducts = []
    console.log('Woocomerce')
    const products = this.woocommerceService.getProducts();
    console.log('getProduct');
    this.http.get(products).subscribe((res: any) => {
      console.log('data', res)
      this.getProducts = res;
    })
  }

  options = {
    timeout: 10000, 
    enableHighAccuracy: true, 
    maximumAge: 3600
  };

  ionViewDidEnter(){
      this.geolocation.getCurrentPosition(this.options).then((resp) => {
        this.latitude = resp.coords.latitude;
        this.longitude = resp.coords.longitude;       
       }).catch((error) => {
         console.log('Error getting location', error);
       });
    }

    moreData(){
     

    }
}
