import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DataSharingService } from '../../../app/services/data-sharing.service';
import { AuthService } from '../../../app/services/auth.service';
import { Router } from '@angular/router';


@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnDestroy {

	@Input() sidebarVisible: boolean = true;
	@Input() navTab: string = "menu";
	@Input() currentActiveMenu;
	@Input() currentActiveSubMenu;
	@Output() changeNavTabEvent = new EventEmitter();
	@Output() activeInactiveMenuEvent = new EventEmitter();
    public themeClass: string = "theme-cyan";
    public darkClass: string = "";
	private ngUnsubscribe = new Subject();
	
	private userName: String;

	constructor(private themeService: ThemeService, public dataSharingService: DataSharingService, public authService: AuthService,private readonly router: Router,) {
        this.themeService.themeClassChange.pipe(takeUntil(this.ngUnsubscribe)).subscribe(themeClass => {
			this.themeClass = themeClass;
        });
        this.themeService.darkClassChange.pipe(takeUntil(this.ngUnsubscribe)).subscribe(darkClass => {
            this.darkClass = darkClass;
        });
    }
	
	ngOnInit() {
		this.userName = this.dataSharingService.loginResponse.username;
		
		//debugger;
		// this.dataSharingService.userDetails.subscribe(message => (this.loginResponse= message)); //<= Always get current value!
		// this.loginResponse.username;
	   }

	   logOut(){
			this.authService.clearSession();
			this.router.navigate(['/authentication']);
	   }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

	changeNavTab(tab: string) {
		this.navTab = tab;
	}

	activeInactiveMenu(menuItem: string) {
		this.activeInactiveMenuEvent.emit({ 'item': menuItem });
	}

	changeTheme(theme:string){
		this.themeService.themeChange(theme);
    }
    
    changeDarkMode(darkClass: string) {
        this.themeService.changeDarkMode(darkClass);
    }
}
