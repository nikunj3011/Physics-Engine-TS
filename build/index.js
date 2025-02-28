/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/AI/EnemyBox.ts":
/*!****************************!*\
  !*** ./src/AI/EnemyBox.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   EnemyBox: () => (/* binding */ EnemyBox)\n/* harmony export */ });\n/* harmony import */ var _Actor_Actor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Actor/Actor */ \"./src/Actor/Actor.ts\");\n\nclass EnemyBox extends _Actor_Actor__WEBPACK_IMPORTED_MODULE_0__.Actor {\n    constructor(ctx, x, y, width, height, color) {\n        super(ctx, x, y, width, height, color);\n        this.speedMultiplier = 5; // Adjust this value to control the speed\n        this.velocityX = (Math.random() - 0.5) * 2 * this.speedMultiplier; // Random initial velocity with multiplier\n        this.velocityY = (Math.random() - 0.5) * 2 * this.speedMultiplier; // Random initial velocity with multiplier\n    }\n    update() {\n        this.x += this.velocityX;\n        this.y += this.velocityY;\n        if (this.x + this.width > this.ctx.canvas.width) {\n            this.x = this.ctx.canvas.width - this.width;\n            this.velocityX = -this.velocityX;\n        }\n        if (this.x < 0) {\n            this.x = 0;\n            this.velocityX = -this.velocityX;\n        }\n        if (this.y + this.height > this.ctx.canvas.height) {\n            this.y = this.ctx.canvas.height - this.height;\n            this.velocityY = -this.velocityY;\n        }\n        if (this.y < 0) {\n            this.y = 0;\n            this.velocityY = -this.velocityY;\n        }\n    }\n}\n\n\n//# sourceURL=webpack:///./src/AI/EnemyBox.ts?");

/***/ }),

/***/ "./src/Actor/Actor.ts":
/*!****************************!*\
  !*** ./src/Actor/Actor.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Actor: () => (/* binding */ Actor)\n/* harmony export */ });\nclass Actor {\n    constructor(ctx, x, y, width, height, color) {\n        this.ctx = ctx;\n        this.x = x;\n        this.y = y;\n        this.width = width;\n        this.height = height;\n        this.color = color;\n        this.velocityX = 0;\n        this.velocityY = 0;\n        this.gravity = 0.1;\n        this.bounceDamping = 0.7;\n    }\n    update() {\n        this.x += this.velocityX;\n        this.y += this.velocityY;\n        if (this.x + this.width > this.ctx.canvas.width) {\n            this.x = this.ctx.canvas.width - this.width;\n            this.velocityX = -this.velocityX * this.bounceDamping;\n        }\n        if (this.x < 0) {\n            this.x = 0;\n            this.velocityX = -this.velocityX * this.bounceDamping;\n        }\n        if (this.y + this.height > this.ctx.canvas.height) {\n            this.y = this.ctx.canvas.height - this.height;\n            this.velocityY = -this.velocityY * this.bounceDamping;\n        }\n        if (this.y < 0) {\n            this.y = 0;\n            this.velocityY = -this.velocityY * this.bounceDamping;\n        }\n        this.velocityY += this.gravity;\n    }\n    draw() {\n        this.ctx.fillStyle = this.color;\n        this.ctx.fillRect(this.x, this.y, this.width, this.height);\n    }\n}\n\n\n//# sourceURL=webpack:///./src/Actor/Actor.ts?");

/***/ }),

/***/ "./src/GoalBox/GoalBox.ts":
/*!********************************!*\
  !*** ./src/GoalBox/GoalBox.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GoalBox: () => (/* binding */ GoalBox)\n/* harmony export */ });\nclass GoalBox {\n    constructor(ctx, x, y, width, height, color) {\n        this.ctx = ctx;\n        this.x = x;\n        this.y = y;\n        this.width = width;\n        this.height = height;\n        this.color = color;\n    }\n    draw() {\n        this.ctx.fillStyle = this.color;\n        this.ctx.fillRect(this.x, this.y, this.width, this.height);\n    }\n}\n\n\n//# sourceURL=webpack:///./src/GoalBox/GoalBox.ts?");

/***/ }),

/***/ "./src/Levels/Level.ts":
/*!*****************************!*\
  !*** ./src/Levels/Level.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Level: () => (/* binding */ Level)\n/* harmony export */ });\nclass Level {\n    constructor(player, enemies, goal, background) {\n        this.player = player;\n        this.enemies = enemies;\n        this.goal = goal;\n        this.background = background;\n    }\n    update() {\n        this.player.update();\n        this.enemies.forEach(enemy => enemy.update());\n    }\n    draw(ctx) {\n        ctx.fillStyle = this.background;\n        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);\n        this.player.draw();\n        this.enemies.forEach(enemy => enemy.draw());\n        this.goal.draw();\n    }\n    checkCollisions() {\n        return this.enemies.some(enemy => this.player.checkCollision(enemy));\n    }\n    checkWin() {\n        return this.player.checkWin(this.goal);\n    }\n}\n\n\n//# sourceURL=webpack:///./src/Levels/Level.ts?");

/***/ }),

/***/ "./src/Player/Player.ts":
/*!******************************!*\
  !*** ./src/Player/Player.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Player: () => (/* binding */ Player)\n/* harmony export */ });\n/* harmony import */ var _Actor_Actor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Actor/Actor */ \"./src/Actor/Actor.ts\");\n\nclass Player extends _Actor_Actor__WEBPACK_IMPORTED_MODULE_0__.Actor {\n    constructor(ctx, x, y, width, height, color) {\n        super(ctx, x, y, width, height, color);\n        this.isJumping = false;\n    }\n    update() {\n        super.update();\n        if (this.y + this.height >= this.ctx.canvas.height) {\n            this.isJumping = false;\n        }\n    }\n    moveLeft() {\n        this.velocityX = -5;\n    }\n    moveRight() {\n        this.velocityX = 5;\n    }\n    jump() {\n        if (!this.isJumping) {\n            this.velocityY = -10;\n            this.isJumping = true;\n        }\n    }\n    stopMoving() {\n        this.velocityX = 0;\n    }\n    checkCollision(enemy) {\n        if (this.x + this.width > enemy.x &&\n            this.x < enemy.x + enemy.width &&\n            this.y + this.height > enemy.y &&\n            this.y < enemy.y + enemy.height) {\n            return true;\n        }\n        return false;\n    }\n    checkWin(goal) {\n        if (this.x + this.width > goal.x &&\n            this.x < goal.x + goal.width &&\n            this.y + this.height > goal.y &&\n            this.y < goal.y + goal.height) {\n            return true;\n        }\n        return false;\n    }\n}\n\n\n//# sourceURL=webpack:///./src/Player/Player.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _AI_EnemyBox__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AI/EnemyBox */ \"./src/AI/EnemyBox.ts\");\n/* harmony import */ var _GoalBox_GoalBox__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GoalBox/GoalBox */ \"./src/GoalBox/GoalBox.ts\");\n/* harmony import */ var _Levels_Level__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Levels/Level */ \"./src/Levels/Level.ts\");\n/* harmony import */ var _Player_Player__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Player/Player */ \"./src/Player/Player.ts\");\n\n\n\n\nfunction main() {\n    if (typeof document === 'undefined') {\n        console.error('This code must be run in a browser environment.');\n        return;\n    }\n    const canvas = document.getElementById('canvas');\n    const ctx = canvas.getContext('2d');\n    const player = new _Player_Player__WEBPACK_IMPORTED_MODULE_3__.Player(ctx, 50, 50, 50, 50, 'red');\n    const enemy1 = new _AI_EnemyBox__WEBPACK_IMPORTED_MODULE_0__.EnemyBox(ctx, 200, 200, 50, 50, 'blue');\n    const enemy2 = new _AI_EnemyBox__WEBPACK_IMPORTED_MODULE_0__.EnemyBox(ctx, 300, 300, 50, 50, 'green');\n    const goal = new _GoalBox_GoalBox__WEBPACK_IMPORTED_MODULE_1__.GoalBox(ctx, 400, 400, 50, 50, 'orange');\n    let isGameOver = false;\n    let isGameWon = false;\n    const level1 = new _Levels_Level__WEBPACK_IMPORTED_MODULE_2__.Level(player, [new _AI_EnemyBox__WEBPACK_IMPORTED_MODULE_0__.EnemyBox(ctx, 200, 200, 50, 50, 'blue')], new _GoalBox_GoalBox__WEBPACK_IMPORTED_MODULE_1__.GoalBox(ctx, 400, 400, 50, 50, 'orange'), 'lightblue');\n    const level2 = new _Levels_Level__WEBPACK_IMPORTED_MODULE_2__.Level(player, [new _AI_EnemyBox__WEBPACK_IMPORTED_MODULE_0__.EnemyBox(ctx, 300, 300, 50, 50, 'green'), new _AI_EnemyBox__WEBPACK_IMPORTED_MODULE_0__.EnemyBox(ctx, 200, 200, 50, 50, 'blue')], new _GoalBox_GoalBox__WEBPACK_IMPORTED_MODULE_1__.GoalBox(ctx, 400, 400, 50, 50, 'orange'), 'lightgreen');\n    const levels = [level1, level2];\n    let currentLevel = 0;\n    document.addEventListener('keydown', (event) => {\n        switch (event.key) {\n            case 'ArrowLeft':\n                player.moveLeft();\n                break;\n            case 'ArrowRight':\n                player.moveRight();\n                break;\n            case 'ArrowUp':\n                player.jump();\n                break;\n            case 'ArrowDown':\n                break;\n            case 'Enter':\n                if (isGameOver || isGameWon) {\n                    isGameOver = false;\n                    isGameWon = false;\n                    player.x = 50;\n                    player.y = 50;\n                    player.velocityX = 0;\n                    player.velocityY = 0;\n                }\n                break;\n        }\n    });\n    document.addEventListener('keyup', (event) => {\n        switch (event.key) {\n            case 'ArrowLeft':\n            case 'ArrowRight':\n                player.stopMoving();\n                break;\n        }\n    });\n    function animate() {\n        ctx.clearRect(0, 0, canvas.width, canvas.height);\n        if (!isGameOver && !isGameWon) {\n            player.update();\n            player.draw();\n            enemy1.update();\n            enemy1.draw();\n            enemy2.update();\n            enemy2.draw();\n            goal.draw();\n            if (player.checkCollision(enemy1) || player.checkCollision(enemy2)) {\n                isGameOver = true;\n            }\n            else if (player.checkWin(goal)) {\n                isGameWon = true;\n            }\n        }\n        // if (!isGameOver && !isGameWon) {\n        //     levels[currentLevel].update();\n        //     levels[currentLevel].draw(ctx);\n        //     if (levels[currentLevel].checkCollisions()) {\n        //         isGameOver = true;\n        //     } else if (levels[currentLevel].checkWin()) {\n        //         isGameWon = true;\n        //         currentLevel++;\n        //         if (currentLevel >= levels.length) {\n        //             currentLevel = 0;\n        //         }\n        //     }\n        // }\n        else if (isGameOver) {\n            ctx.font = '48px Arial';\n            ctx.fillStyle = 'red';\n            ctx.textAlign = 'center';\n            ctx.textBaseline = 'middle';\n            ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2);\n            ctx.font = '24px Arial';\n            ctx.fillText('Press Enter to try again', canvas.width / 2, canvas.height / 2 + 50);\n        }\n        else if (isGameWon) {\n            ctx.font = '48px Arial';\n            ctx.fillStyle = 'green';\n            ctx.textAlign = 'center';\n            ctx.textBaseline = 'middle';\n            ctx.fillText('You Win!', canvas.width / 2, canvas.height / 2);\n            ctx.font = '24px Arial';\n            ctx.fillText('Press Enter to play again', canvas.width / 2, canvas.height / 2 + 50);\n        }\n        requestAnimationFrame(animate);\n    }\n    animate();\n}\nmain();\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;