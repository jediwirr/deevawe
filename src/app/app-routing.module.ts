import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		loadChildren: () =>
			import('./pages/home/home.module').then((m) => m.HomePageModule),
	},
	{
		path: 'profile',
		loadChildren: () =>
			import('./pages/profile/profile.module').then(
				(m) => m.ProfileModule
			),
	},
	{
		path: 'humans',
		loadChildren: () =>
			import('./pages/humans/humans.module').then((m) => m.HumansModule),
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
