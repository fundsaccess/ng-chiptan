<p align="center">
  <img height="256px" width="256px" style="text-align: center;" src="https://fundsaccess.github.io/ngx-chiptan/assets/angular.svg">
</p>

# ng-chiptan
Angularjs component to render chiptan flicker code

Demo: https://fundsaccess.github.io/ng-chiptan/ 

For the Angular 2+ version see https://github.com/fundsaccess/ngx-chiptan

## Installation

npm:
```
$ npm i ngx-chiptan --save
```

yarn:
```shell
yarn add ngx-chiptan
```

## Import

Once installed you need to import the main module:
```javascript
import 'ng-chiptan';

angular.module('app', ['ngChiptan'])
```
## Usage
```html
<ng-chiptan 
    code="'17850120452019980412345678041234567804123456789E'"
    width="300" 
    height="150"  
    bgColor="'#000'" 
    barColor="'#fff'">
</ng-chiptan>
```

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| code | string | '' | ChipTAN [code](https://6xq.net/flickercodes/) to render. |
| width | number | 205 | Canvas width. |
| height | number | 100 | Canvas height. |
| bgColor | string | '#000' | Canvas background color. |
| barColor | string | '#fff' | Vertical bar(s) in canvas color. |

## Demo
https://fundsaccess.github.io/ng-chiptan/ 

or
```
npm run start
```

## Acknowledgments

Inspired by  
[chipTAN Flickercodes article](https://6xq.net/flickercodes/)

[react-chiptan](https://github.com/basimhennawi/react-chiptan)

## License
Copyright (c) 2019 fundsaccess AG. Licensed under the MIT License (MIT)
