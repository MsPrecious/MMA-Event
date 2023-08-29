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
exports.Fighter = void 0;
const typeorm_1 = require("typeorm");
const Fight_1 = require("./Fight");
let Fighter = class Fighter {
    constructor() {
        this.fightsAsFighter1 = [];
        this.fightsAsFighter2 = [];
    }
};
exports.Fighter = Fighter;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Fighter.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Fighter.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Fighter.prototype, "wins", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Fighter.prototype, "losses", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Fighter.prototype, "knockouts", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Fighter.prototype, "submissions", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Fighter.prototype, "nationality", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Fighter.prototype, "team", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Fighter.prototype, "rank", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Fight_1.Fight, (fight) => fight.fighter1),
    __metadata("design:type", Array)
], Fighter.prototype, "fightsAsFighter1", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Fight_1.Fight, (fight) => fight.fighter2),
    __metadata("design:type", Array)
], Fighter.prototype, "fightsAsFighter2", void 0);
exports.Fighter = Fighter = __decorate([
    (0, typeorm_1.Entity)()
], Fighter);
