import { Pipe, PipeTransform } from '@angular/core';

import { environment } from "../../environments/environment";

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform( codigo:string ): any {
    return environment.URL_IMAGEN + "/" + codigo + ".jpg";
  }

}
