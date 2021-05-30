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
exports.BlogService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const blog_entity_1 = require("./blog.entity");
const typeorm_2 = require("typeorm");
const schedule_1 = require("@nestjs/schedule");
let BlogService = class BlogService {
    constructor(blogRepository) {
        this.blogRepository = blogRepository;
    }
    async getAllBlog() {
        return await this.blogRepository.find();
    }
    async createBlog(data) {
        return await this.blogRepository.save(data);
    }
    async getOneBlog(id) {
        const blog = await this.blogRepository.findOne(id);
        if (!blog) {
            throw new common_1.HttpException("Blog with this id does not exist", common_1.HttpStatus.NOT_FOUND);
        }
        return blog;
    }
    async updateBlog(id, data) {
        const updatedBlog = this.blogRepository.findOne(id);
        if (!updatedBlog) {
            throw new common_1.HttpException("Blog with this id does not exist", common_1.HttpStatus.NOT_FOUND);
        }
        if (data.title) {
            (await updatedBlog).title = data.title;
        }
        if (data.content) {
            (await updatedBlog).content = data.content;
        }
        return await this.blogRepository.save(await updatedBlog);
    }
    async deleteBlog(id) {
        const blog = await this.blogRepository.delete(id);
        if (!blog) {
            throw new common_1.HttpException("Blog with this id does not exist", common_1.HttpStatus.NOT_FOUND);
        }
        return { status: common_1.HttpStatus.OK };
    }
    async paginateBlog(data) {
        const take = data.take || 10;
        const skip = data.skip || 0;
        const [result, total] = await this.blogRepository.findAndCount({
            take: take,
            skip: skip
        });
        return { data: result, count: total };
    }
    async handleCron() {
        let randomText = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        for (let i = 0; i < 5; i++)
            randomText += possible.charAt(Math.floor(Math.random() * possible.length));
        const allBlogs = await this.getAllBlog();
        allBlogs.map(async (s) => {
            const blog = await this.getOneBlog(s.id);
            blog.title = s.title + randomText;
            await this.blogRepository.save(blog);
        });
    }
};
__decorate([
    schedule_1.Cron(schedule_1.CronExpression.EVERY_DAY_AT_2PM),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BlogService.prototype, "handleCron", null);
BlogService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(blog_entity_1.BlogEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BlogService);
exports.BlogService = BlogService;
//# sourceMappingURL=blog.service.js.map