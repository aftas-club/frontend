import {Component, Input, OnInit} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {FishAnimationComponent} from "../fish-animation/fish-animation.component";
import {User} from "../../core/model/user";
import {AuthenticationService} from "../../core/services/authentication.service";

@Component({
  selector: 'nav-bar',
  standalone: true,
  imports: [
    NgOptimizedImage,
    FishAnimationComponent
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit{
  @Input() IsOpen: Boolean = false;
  user: User | undefined;

  constructor(private service: AuthenticationService) {
  }

  ngOnInit(): void {
    this.service.getCurrentAuthenticatedUser().subscribe((user: User) => {
      this.user = user;
    });
  }


}
