import { Component, Input, OnInit } from '@angular/core';
import { Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-save-file',
  templateUrl: './save-file.component.html',
  styleUrls: ['./save-file.component.scss'],
})
export class SaveFileComponent implements OnInit {
  @Input() image: Photo = {} as Photo;
  @Input() modalController: ModalController = {} as ModalController;

  constructor() { }

  ngOnInit() {
    this.createFolders();
  }

  async createFolders() {
    // Check if the folders exist
    const result = await Filesystem.readdir({
      path: `/`,
      directory: Directory.Data,
    });
    const funFolder = result.files.filter((file) => {file.name === 'fun'});
    if(funFolder.length === 0) {
      await this.createFolder('fun');
    }
    const workFolder = result.files.filter((file) => {file.name === 'work'});
    if(workFolder.length === 0) {
      await this.createFolder('work');
    }
    const testFolder = result.files.filter((file) => {file.name === 'test'});
    if(testFolder.length === 0) {
      await this.createFolder('test');
    }
  }

  async createFolder(folderName: string) {
    await Filesystem.mkdir({
      path: `${folderName}`,
      directory: Directory.Data,
      recursive: true,
    });
  }

  async savePhotoToFolder(folderName: string) {
    const date = new Date();
    const time = date.getTime();
    const photoInTempStorage = await Filesystem.readFile({ 
      path: this.image.path? this.image.path : '',
    });

    await Filesystem.writeFile({
      path: `${folderName}/${time}.jpeg`,
      data: photoInTempStorage.data? photoInTempStorage.data: '',
      directory: Directory.Data,
    });
    this.modalController.dismiss();
  }

}
