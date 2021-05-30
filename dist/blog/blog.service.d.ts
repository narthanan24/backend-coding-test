import { HttpStatus } from "@nestjs/common";
import { BlogEntity } from "./blog.entity";
import { Repository } from "typeorm";
export declare class BlogService {
    private blogRepository;
    constructor(blogRepository: Repository<BlogEntity>);
    getAllBlog(): Promise<BlogEntity[]>;
    createBlog(data: any): Promise<BlogEntity>;
    getOneBlog(id: any): Promise<BlogEntity>;
    updateBlog(id: any, data: any): Promise<BlogEntity>;
    deleteBlog(id: any): Promise<{
        status: HttpStatus;
    }>;
    paginateBlog(data: any): Promise<{
        data: BlogEntity[];
        count: number;
    }>;
    handleCron(): Promise<void>;
}
