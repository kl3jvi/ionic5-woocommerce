import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class WooCommerceService {
  url: string = "https://psmuae.com";
  consumerKey: string = "ck_754407d19e9a305e987eeb5724b68b0dc6b70eca";
  consumerSecret: string = "cs_caf0aafe080cad9a7411312796bd739e22e8ebc2";

  constructor(private http: HttpClient) { }

  getProducts() {
    return `${this.url}/wp-json/wc/v3/products?consumer_key=${
      this.consumerKey
      }&consumer_secret=${this.consumerSecret}`;
  }

  getTags() {
    return new Promise(resolve => {
      this.http
        .get(
          `${this.url}/wp-json/wc/v3/products/tags?consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}`
        )
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  getProduct(pid) {
    return new Promise(resolve => {
      this.http
        .get(
          `${this.url}/wp-json/wc/v3/products/${pid}?consumer_key=${
          this.consumerKey
          }&consumer_secret=${this.consumerSecret}`
        )
        .subscribe(productData => {
          resolve(productData);
        });
    });
  }

  getProductReviews(pid) {
    return new Promise(resolve => {
      this.http
        .get(
          `${this.url}/wp-json/wc/v2/products/${pid}/reviews?consumer_key=${
          this.consumerKey
          }&consumer_secret=${this.consumerSecret}`
        )
        .subscribe(productData => {
          resolve(productData);
        });
    });
  }
}