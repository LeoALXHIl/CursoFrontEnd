import { Component } from '@angular/core';
import { HeaderComponent } from "./template/header/header.component";
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [HeaderComponent, RouterModule]
})
export class AppComponent {
  title = 'sa_portal_rh';
}
