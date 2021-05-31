import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BlogEntity } from "./blog.entity";
import { Repository } from "typeorm";
import { Cron, CronExpression } from "@nestjs/schedule";
import * as admin from "firebase-admin";

@Injectable()
export class BlogService {

  constructor(@InjectRepository(BlogEntity) private blogRepository: Repository<BlogEntity>) {
  }

  async getAllBlog(): Promise<BlogEntity[]> {
    return await this.blogRepository.find();
  }

  async createBlog(data): Promise<BlogEntity> {
    const blog = await this.blogRepository.save(data);
    const db = admin.firestore();

    const doc = await db.collection("code_test").doc()
    doc.set(blog)
    return blog;
  }

  async getOneBlog(id): Promise<BlogEntity> {
    const blog = await this.blogRepository.findOne(id);
    if (!blog) {
      throw new HttpException("Blog with this id does not exist", HttpStatus.NOT_FOUND);
    }
    return blog;
  }

  async updateBlog(id, data): Promise<BlogEntity> {
    const updatedBlog = this.blogRepository.findOne(id);
    if (!updatedBlog) {
      throw new HttpException("Blog with this id does not exist", HttpStatus.NOT_FOUND);
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
      throw new HttpException("Blog with this id does not exist", HttpStatus.NOT_FOUND);
    }
    return { status: HttpStatus.OK };
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

  // CRON job
  @Cron(CronExpression.EVERY_DAY_AT_2PM)
  async handleCron() {

    let randomText = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (let i = 0; i < 5; i++)
      randomText += possible.charAt(Math.floor(Math.random() * possible.length));

    const allBlogs = await this.getAllBlog();
    allBlogs.map(async s => {
      const blog = await this.getOneBlog(s.id);
      blog.title = s.title + randomText;
      await this.blogRepository.save(blog);
    });
    // testing
    // console.log(await this.getAllBlog());
  }
}
