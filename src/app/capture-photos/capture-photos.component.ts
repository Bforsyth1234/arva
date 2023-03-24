import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, Photo } from '@capacitor/camera';
import { ModalController } from '@ionic/angular';
import { SaveFileComponent } from '../save-file/save-file.component';

@Component({
  selector: 'app-capture-photos',
  templateUrl: './capture-photos.component.html',
  styleUrls: ['./capture-photos.component.scss'],
})
export class CapturePhotosComponent  implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri
    });
    this.openSaveImageModal(image);

  }

  async openSaveImageModal(image: Photo) {
    const modal = await this.modalController.create({
      component: SaveFileComponent,
      componentProps: {image: image, modalController: this.modalController}
    });
    return modal.present();
  }

}
