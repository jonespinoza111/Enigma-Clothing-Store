import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { CollectionComponent } from './pages/collection/collection.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'cart', component: CartComponent },
    { path: 'collection/:id', component: CollectionComponent },
    { path: 'checkout', component: CheckoutComponent },
    { path: 'product', component: ProductDetailsComponent },
];
