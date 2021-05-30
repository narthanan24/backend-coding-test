import { Body, Controller, Delete, Get, Param, Patch, Post, Query, SetMetadata, UseGuards } from "@nestjs/common";
import { BlogGuard } from "./blog.guard";
import { BlogService } from "./blog.service";
import { BlogDto, PaginateDto } from "./blog.dto";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller('blog')
@UseGuards(BlogGuard)
export class BlogController {
  constructor(private blogService:BlogService) {
  }

  @Get('public')
  async paginateBlog(@Query() paginateDto:PaginateDto){
    return await this.blogService.paginateBlog(paginateDto)
  }

  @Get()
  @ApiBearerAuth()
  @SetMetadata('roles',['admin'])
  async getAllBlog(){
    return await this.blogService.getAllBlog();
  }

  @Post()
  @ApiBearerAuth()
  @SetMetadata('roles',['admin'])
  async createBlog(@Body() blogDto:BlogDto){
    return await this.blogService.createBlog(blogDto);
  }

  @Get(':id')
  @ApiBearerAuth()
  @SetMetadata('roles',['admin'])
  async getOneBlog(@Param('id') id:string){
    return await this.blogService.getOneBlog(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @SetMetadata('roles',['admin'])
  async updateBlog(@Param('id') id:string,@Body() blogDto:BlogDto){
    return await this.blogService.updateBlog(id,blogDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @SetMetadata('roles',['admin'])
  async deleteBlog(@Param('id') id:string){
    return await this.blogService.deleteBlog(id);
  }

}
