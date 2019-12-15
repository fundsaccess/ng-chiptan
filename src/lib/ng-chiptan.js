import {flickerCanvas, flickerCode} from './flicker';

angular.module('ngChiptan', [])
    .component('ngChiptan', {
      template: `
      <div id='flickercontainer'></div>
      `,
      bindings: {
        code: '<',
        width: '<',
        height: '<',
        bgColor: '<',
        barColor: '<',
      },
      controller: function chiptanController() {
        this.$onInit = () => {
          this.state = {
            canvas: new flickerCanvas(this.width, this.height, this.bgColor, this.barColor),
            code: new flickerCode(this.code),
          };

          const {canvas, code} = this.state;

          if (!this.code) {
            return;
          }

          document
              .getElementById('flickercontainer')
              .appendChild(canvas.getCanvas());

          canvas.setCode(code);

          this.startFlicker();
        };


        this.startFlicker = () => {
          this.interval = setInterval(this.step.bind(this), 50);
        };

        this.stopFlicker = () => {
          clearInterval(this.interval);
        };

        this.step = () => {
          this.state.canvas.step();
        }
      }
    });

