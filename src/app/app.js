import angular from 'angular';
import './../lib/ng-chiptan.js';
import './app.css';
import './app.html';

class ApplicationController {

    constructor() {
    }

    $onInit() {
        this.title = 'ng-chiptan';

        this.chiptanSettingsDefault = {
            code: '17850120452019980412345678041234567804123456789E',
            zoomButtons: false
        };

        this.chiptanSettingsCustom = {
            code: '17850120452019980412345678041234567804123456789E',
            width: 400,
            height: 250,
            bgColor: 'green',
            barColor: 'orange',
            zoomClass: 'chiptan-zoom',
            zoomButtons: true
        };
    }
}

const ApplicationComponent = {
    controller: ApplicationController,
    templateUrl: './app/app.html'
};

const APP = angular
    .module('app', ['ngChiptan'])
    .component('app', ApplicationComponent);

export { APP };
