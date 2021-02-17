import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../app/services/auth.service';
import { ThemeService } from '../../services/theme.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css'],
	providers: [NgbDropdownConfig]
})
export class HeaderComponent implements OnInit {

	// Properties

	@Input() showNotifMenu: boolean = false;
    @Input() showToggleMenu: boolean = false;
    @Input() darkClass:string = "";
	@Output() toggleSettingDropMenuEvent = new EventEmitter();
	@Output() toggleNotificationDropMenuEvent = new EventEmitter();

	constructor(private config: NgbDropdownConfig, private themeService: ThemeService, private authService: AuthService,
		private router: Router) {
		config.placement = 'bottom-right';
	}

	ngOnInit() {
	}

	toggleSettingDropMenu() {
		this.toggleSettingDropMenuEvent.emit();
	}

	toggleNotificationDropMenu() {
		this.toggleNotificationDropMenuEvent.emit();
	}

	toggleSideMenu(){
		this.themeService.showHideMenu();
	}

	logOut(){
		this.authService.clearSession();
		this.router.navigate(['/authentication']);
	}

}
