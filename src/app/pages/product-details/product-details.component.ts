import { Component, OnInit } from '@angular/core';
import { Product, Variation } from '../../models/product.model';
import { collections } from '../../data/collections';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductService } from '../../product.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../cart.service';
import { NotificationService } from '../../notification.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [ProductCardComponent, CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  description: string = `Introducing our "Azure Breeze Men's Sweater" – a perfect blend of style and comfort. Crafted with utmost care, this light blue sweater is made from premium quality, soft fabric that feels gentle against the skin. Its classic design showcases a versatile style that can be dressed up or down effortlessly. Whether you're heading to a casual outing or a formal occasion, this sweater will keep you cozy while making a fashionable statement. Elevate your wardrobe with the Azure Breeze Men's Sweater and experience the perfect combination of sophistication and comfort.`;
  truncatedDescription: string = '';
  truncated: boolean = true;
  outputDescription: string = '';
  products: Product[] = [];
  productInfo: any;
  currentVariation: any;
  uniqueColors: any;
  uniqueSizes: any;
  selectedSize: any;
  selectedColor: any;
  availableColors: any = ['Green', 'Yellow'];
  availableSizes: any = [];
  // products: Product[] = collections[0].products.slice(0, 4);

  constructor(private productService: ProductService, private route: ActivatedRoute, private cartService: CartService, private notificationService: NotificationService) {
    this.route.params.subscribe(params => {
      let productId = params['id'];
      console.log()
      
        this.productInfo = this.productService.getProductById(productId)
        .subscribe(
          (response: Product) => {
            this.productInfo = response;
            this.currentVariation = response.variations[0];
            // this.uniqueColors = [...new Set(response.variations.map(variation => variation.color))];
            this.getUniqueSizesAndColors(response);
            console.log('here is the productInfo, ', this.productInfo);
            console.log('here is the uniquecolors, ', this.uniqueColors);
            console.log('here is the unique sizes, ', this.uniqueSizes);
            this.toggleSelectedColor(this.currentVariation.color);
            this.selectSize(this.currentVariation.size);
            

          },
          (error: any) => {
            console.error('Error fetching products:', error);
          }
        )
    })
    this.productService.getAllProducts().subscribe(
      (response: Product[]) => {
        this.products = response.slice(0, 4);;
        console.log('here are the products, ', this.products);
      },
      (error: any) => {
        console.error('Error fetching products:', error);
      }
    );;
  }

  ngOnInit() {
    // Assuming you have assigned the description value from your data source
    this.truncateDescription(30);
    this.outputDescription = this.truncatedDescription;
  }

  truncateDescription(wordsLimit: number) {
    const words = this.description.split(' ');
    const truncatedWords = words.slice(0, wordsLimit);
    this.truncatedDescription = truncatedWords.join(' ');
  }

  onReadMore() {
    this.outputDescription = this.description;
    this.truncated = false;
  }

  onReadLess() {
    this.outputDescription = this.truncatedDescription;
    this.truncated = true;
  }

  changeVariation(color: string, size: string) {
    this.currentVariation = this.productInfo.variations.find(
      (variation: Variation) => variation.color === color && variation.size === size
    );
    console.log('changing to this variation: ', this.currentVariation);
  }

  addToCart(event: MouseEvent, item: any) {
    event.stopPropagation();
    console.log('my cart item here: ', item);
    
    let cartItem = {
      id: item._id,
      name: item.name,
      color: this.currentVariation.color,
      size: this.currentVariation.size,
      price: this.currentVariation.price,
      imageUrl: item.imageUrl,
      quantity: 1
    }


    let alreadyInCart = this.cartService.getAlreadyInCart(cartItem.id, cartItem.color, cartItem.size);
    if (alreadyInCart) {
      this.cartService.updateQuantity(cartItem, alreadyInCart.quantity + 1);
      this.triggerAddToCartNotification();
    } else {
      console.log('new cart item getting added: ', cartItem);
      this.cartService.addToCart(cartItem);
      this.triggerAddToCartNotification(cartItem.name);
    }

  }

  getUniqueSizesAndColors(product: Product) {
    this.uniqueColors = [...new Set(product.variations.map(variation => variation.color))];
    this.uniqueSizes = [...new Set(product.variations.map(variation => variation.size))];
  }

  selectSize(size: string) {
    this.selectedSize = size;
    this.changeVariation(this.selectedColor, size);
  }

  changeColor(color: string) {
    let variations = this.productInfo.variations.filter((variation: Variation) => variation.color == color);
    console.log('variations for color here: ', variations);

    this.uniqueSizes = [...new Set(variations.map((variation: Variation) => variation.size))];

    this.currentVariation = variations[0];
  }

  getAvailableSizes(color: string) {
    let sizes = this.productInfo.variations.filter((variation: Variation) => variation.color == color && variation.size)
    .map((variation: Variation) => variation.size);
    this.availableSizes = sizes;
  }

  toggleSelectedColor(color: string) {
      this.selectedColor = color;
      this.getAvailableSizes(color);
      console.log('available sizes in togglecolro: ', this.availableSizes);
      this.selectedSize = this.availableSizes[0];
      this.changeVariation(color, this.selectedSize);
  }

  triggerAddToCartNotification(productName?: string) {
    let finalMessage = productName ? `${productName} Added to Cart` : 'Item Added to Cart';
    this.notificationService.triggerNotification({ 
      message: finalMessage, 
      details: 'Success', 
      options: { timeOut: 3000 },
      type: "success"
    });
  }
}
