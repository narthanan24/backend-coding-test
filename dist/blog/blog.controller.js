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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogController = void 0;
const common_1 = require("@nestjs/common");
const blog_guard_1 = require("./blog.guard");
const blog_service_1 = require("./blog.service");
const blog_dto_1 = require("./blog.dto");
const swagger_1 = require("@nestjs/swagger");
let BlogController = class BlogController {
    constructor(blogService) {
        this.blogService = blogService;
    }
    async paginateBlog(paginateDto) {
        return await this.blogService.paginateBlog(paginateDto);
    }
    async getAllBlog() {
        return await this.blogService.getAllBlog();
    }
    async createBlog(blogDto) {
        return await this.blogService.createBlog(blogDto);
    }
    async getOneBlog(id) {
        return await this.blogService.getOneBlog(id);
    }
    async updateBlog(id, blogDto) {
        return await this.blogService.updateBlog(id, blogDto);
    }
    async deleteBlog(id) {
        return await this.blogService.deleteBlog(id);
    }
};
__decorate([
    common_1.Get('public'),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [blog_dto_1.PaginateDto]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "paginateBlog", null);
__decorate([
    common_1.Get(),
    swagger_1.ApiBearerAuth(),
    common_1.SetMetadata('roles', ['admin']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "getAllBlog", null);
__decorate([
    common_1.Post(),
    swagger_1.ApiBearerAuth(),
    common_1.SetMetadata('roles', ['admin']),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [blog_dto_1.BlogDto]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "createBlog", null);
__decorate([
    common_1.Get(':id'),
    swagger_1.ApiBearerAuth(),
    common_1.SetMetadata('roles', ['admin']),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "getOneBlog", null);
__decorate([
    common_1.Patch(':id'),
    swagger_1.ApiBearerAuth(),
    common_1.SetMetadata('roles', ['admin']),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, blog_dto_1.BlogDto]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "updateBlog", null);
__decorate([
    common_1.Delete(':id'),
    swagger_1.ApiBearerAuth(),
    common_1.SetMetadata('roles', ['admin']),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "deleteBlog", null);
BlogController = __decorate([
    common_1.Controller('blog'),
    common_1.UseGuards(blog_guard_1.BlogGuard),
    __metadata("design:paramtypes", [blog_service_1.BlogService])
], BlogController);
exports.BlogController = BlogController;
//# sourceMappingURL=blog.controller.js.map