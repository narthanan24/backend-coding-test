import { BlogService } from "./blog.service";
import { BlogDto, PaginateDto } from "./blog.dto";
export declare class BlogController {
    private blogService;
    constructor(blogService: BlogService);
    paginateBlog(paginateDto: PaginateDto): Promise<{
        data: import("./blog.entity").BlogEntity[];
        count: number;
    }>;
    getAllBlog(): Promise<import("./blog.entity").BlogEntity[]>;
    createBlog(blogDto: BlogDto): Promise<import("./blog.entity").BlogEntity>;
    getOneBlog(id: string): Promise<import("./blog.entity").BlogEntity>;
    updateBlog(id: string, blogDto: BlogDto): Promise<import("./blog.entity").BlogEntity>;
    deleteBlog(id: string): Promise<{
        status: import("@nestjs/common").HttpStatus;
    }>;
}
