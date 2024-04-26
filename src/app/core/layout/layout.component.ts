import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
  Input,
} from "@angular/core";
import { MediaMatcher } from "@angular/cdk/layout";
import { SidebarService } from "@core/services/nav-bar-toggle.service";
import {
  RouterEvent,
  NavigationEnd,
  Router,
} from "@angular/router";
import { MatSidenav } from "@angular/material/sidenav";
import { mainContentAnimation } from "@core/helper/nav-bar-animations";
import { LocalStorageType } from "@core/constants";

@Component({
  selector: "ite-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"],
  animations: [mainContentAnimation()],
})
export class LayoutComponent implements OnInit {
  @Input() key: boolean;
  @ViewChild("snav") sidenav: MatSidenav;
  mobileQuery: MediaQueryList;
  // tslint:disable-next-line: variable-name
  private _mobileQueryListener: () => void;
  public logo_url = "assets/images/logo/logo_ma_white.png";
  public logo_url_mobile = "assets/images/logo/logo_ma_short.png";
  public route_home_url = "/admin/dashboard";
  sidebarState: string;
  @ViewChild("webContent", { static: false }) webContent: ElementRef;
  // mobileQuery = {
  //   matches =false
  // }.
  constructor(
    private cdRef: ChangeDetectorRef,
    media: MediaMatcher,
    private sidebarService: SidebarService,
    private router: Router
  ) {
    this.route_home_url = localStorage.getItem(LocalStorageType.DefaultUrl);
    this.mobileQuery = media.matchMedia("(min-width: 768px)");
  }

  ngAfterViewChecked(){
    this.cdRef.detectChanges();
  }

  ngOnInit() {
    this.sidebarService.sidebarStateObservable$.subscribe(
      (newState: string) => {
        this.sidebarState = newState;
      }
    );
    this.router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });
  }
  toggleMenu() {
    // document.getElementById("snav").classList.add("hide-item");
    if (this.mobileQuery.matches) {
      this.sidebarService.toggle();
    } else {
      if (this.sidebarState === "close") {
        this.sidebarService.toggle();
      }
      this.sidenav.toggle();
    }
  }
  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationEnd) {
      if (!this.mobileQuery.matches && this.sidenav.opened) {
        this.sidenav.toggle();
      }
    }
  }
}
