import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './schemas/review.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ReviewsService {
  constructor(@InjectModel(Review.name)
  private ReviewModel: Model<Review>) { }

  async create(createReviewDto: CreateReviewDto) {
    const { user, restaurant, rating, image, comment } = createReviewDto;

    const review = await this.ReviewModel.create({
      user, restaurant, rating, image, comment
    })
    return {
      _id: review._id,
    }
    return 'This action adds a new review';
  }

  findAll() {
    return `This action returns all reviews`;
  }

  findOne(id: number) {
    return `This action returns a #${id} review`;
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }
}
