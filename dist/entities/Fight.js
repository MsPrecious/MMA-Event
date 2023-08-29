"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fight = void 0;
const typeorm_1 = require("typeorm");
const Fighter_1 = require("./Fighter");
const Event_1 = require("./Event");
let Fight = class Fight {
    constructor() {
        this.event = new Event_1.Event();
    }
};
exports.Fight = Fight;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Fight.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Fighter_1.Fighter, (fighter) => fighter.fightsAsFighter1),
    __metadata("design:type", Fighter_1.Fighter)
], Fight.prototype, "fighter1", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Fighter_1.Fighter, (fighter) => fighter.fightsAsFighter2),
    __metadata("design:type", Fighter_1.Fighter)
], Fight.prototype, "fighter2", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Event_1.Event, (event) => event.fights),
    __metadata("design:type", Event_1.Event)
], Fight.prototype, "event", void 0);
exports.Fight = Fight = __decorate([
    (0, typeorm_1.Entity)()
], Fight);
