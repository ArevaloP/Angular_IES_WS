import { Component, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { navItems } from '../../_nav';
import { RestUserAuthService } from '../../aplicacion/servicio/rest-user-auth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnDestroy {
  public navItems = navItems;
  public sidebarMinimized = true;
  public changes: MutationObserver;
  public element: HTMLElement;
  public userData:any;
 
 
  constructor(
    private authRest:RestUserAuthService,
    @Inject(DOCUMENT) _document?: any,
  ) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
    });
    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ['class']
    });

    this.userData=authRest.getUser();

  }



  logout(){
      this.authRest.logout();
  }



  ngOnDestroy(): void {
    this.changes.disconnect();
  }



}
