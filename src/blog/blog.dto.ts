export class BlogDto{
  readonly title:string;
  readonly content:string;
}

export class PaginateDto{
  readonly take:number
  readonly skip:number
}
