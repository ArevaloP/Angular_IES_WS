import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { OfficeGrupoComponent } from './componente/office-grupo/office-grupo.component';




const routes: Routes = [


    {

        path: '',
        canActivate: [MsalGuard],
        data: {
            title: 'api-office'
        },

        children: [
            {
                path: 'grupo',
                data: {
                    title: 'Grupo'
                },
                component: OfficeGrupoComponent

            }
        ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ApiOfficeRoutingModule { }
