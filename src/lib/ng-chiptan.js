import angular from 'angular';
import { flickerCanvas, flickerCode } from './flicker';

/**
 * @type {ChiptanSettings}
 */
const DEFAULT_SETTINGS = {
    width: 200,
    height: 150,
    widthStep: 20,
    heightStep: 10,
    bgColor: '#000',
    barColor: '#fff',
    zoomClass: '',
    zoomButtons: true
};

const MIN_TIMEOUT = 300;
const FLICKER_INTERVAL = 50;

/**
 * @property {?string} id - Component ID (optional).
 * @property {ChiptanSettings} chiptanSettings - Settings.
 *
 * @ngInject
 */
class ChiptanController {

    /**
     * @param {angular.ITimeoutService} $timeout - Service.
     * @param {angular.IIntervalService} $interval - Service.
     */
    constructor(
        $timeout,
        $interval
    ) {
        this._$timeout = $timeout;
        this._$interval = $interval;
    }

    $onInit() {
        this._drawChiptan();
    }

    $onDestroy() {
        this.stopFlicker();
    }

    // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---

    startFlicker() {
        this.intervalListener = this._$interval(() => {
            this._doStep();

            this.drawCompleted = true;
        }, FLICKER_INTERVAL);
    }

    stopFlicker() {
        if (this.intervalListener) {
            this._$interval.cancel(this.intervalListener);
            this.intervalListener = null;
        }
    }

    zoomIn() {
        this.stopFlicker();

        this.chiptanSettings.width += this.chiptanSettings.widthStep;
        this.chiptanSettings.height += this.chiptanSettings.heightStep;

        this.drawCompleted = false;

        this._drawChiptan();
    }

    zoomOut() {
        this.stopFlicker();

        this.chiptanSettings.width -= this.chiptanSettings.widthStep;
        this.chiptanSettings.height -= this.chiptanSettings.heightStep;

        this.drawCompleted = false;

        this._drawChiptan();
    }

    // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---

    /**
     * Validate options and set default values.
     * @private
     */
    _validateOptions() {
        this.id = this.id || this._getRandomId();
        this.chiptanSettings.width = this.chiptanSettings.width || DEFAULT_SETTINGS.width;
        this.chiptanSettings.height = this.chiptanSettings.height || DEFAULT_SETTINGS.height;
        this.chiptanSettings.widthStep = this.chiptanSettings.widthStep || DEFAULT_SETTINGS.widthStep;
        this.chiptanSettings.heightStep = this.chiptanSettings.heightStep || DEFAULT_SETTINGS.heightStep;
        this.chiptanSettings.bgColor = this.chiptanSettings.bgColor || DEFAULT_SETTINGS.bgColor;
        this.chiptanSettings.barColor = this.chiptanSettings.barColor || DEFAULT_SETTINGS.barColor;
        this.chiptanSettings.zoomClass = this.chiptanSettings.zoomClass || DEFAULT_SETTINGS.zoomClass;

        const hasZoomButtons = (this.chiptanSettings.zoomButtons !== undefined && this.chiptanSettings.zoomButtons !== null);
        this.chiptanSettings.zoomButtons = (hasZoomButtons) ? this.chiptanSettings.zoomButtons : DEFAULT_SETTINGS.zoomButtons;
    }

    /**
     * Generate random ID if not defined in component.
     * @return {string}
     * @private
     */
    _getRandomId() {
        return Math.random().toString(36).replace(/[^a-z]+/g, '');
    }

    _drawChiptan() {
        if (!this.chiptanSettings.code) {
            throw new Error('Missed code');
        }

        this._validateOptions();

        this.state = {
            canvas: new flickerCanvas(
                this.chiptanSettings.width,
                this.chiptanSettings.height,
                this.chiptanSettings.bgColor,
                this.chiptanSettings.barColor
            ),
            code: new flickerCode(this.chiptanSettings.code)
        };

        const {canvas, code} = this.state;

        this._$timeout(() => {
            /**
             * @type {JQLite}
             */
            const flickerContainer = angular.element(document.querySelector(`#flickercontainer-${ this.id }`));

            if (flickerContainer) {
                // clean if exist
                flickerContainer.empty();

                flickerContainer.append(canvas.getCanvas());

                canvas.setCode(code);

                this.startFlicker();
            } else {
                this.drawCompleted = true;

                throw new Error('flicker container not found');
            }
        }, MIN_TIMEOUT);
    }

    _doStep() {
        this.state.canvas.step();
    }

}

/**
 * @type {angular.IComponentOptions}
 */
const ChiptanComponent = {
    template: `
    <div data-ng-class="$ctrl.chiptanSettings.zoomClass" data-ng-if="$ctrl.chiptanSettings.zoomButtons">
        <button data-ng-click="$ctrl.zoomIn()" data-ng-disabled="!$ctrl.drawCompleted">▲</button>
        <button data-ng-click="$ctrl.zoomOut()" data-ng-disabled="!$ctrl.drawCompleted">▼</button>
    </div>
    <div id='flickercontainer-{{$ctrl.id}}'></div>
    `,
    bindings: {
        id: '@',
        chiptanSettings: '<'
    },
    controller: ChiptanController
};

angular
    .module('ngChiptan', [])
    .component('ngChiptan', ChiptanComponent);

