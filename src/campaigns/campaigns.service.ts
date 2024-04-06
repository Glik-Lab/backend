import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Stripe from 'stripe';
import { Repository } from 'typeorm';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { Campaign } from './entities/campaign.entity';

@Injectable()
export class CampaignsService {
  private readonly stripe = new Stripe(process.env.STRIPE_KEY, {});
  constructor(
    @InjectRepository(Campaign)
    private readonly campaingRepository: Repository<Campaign>,
  ) {}
  async create(
    file: Express.Multer.File,
    createCampaignDto: CreateCampaignDto,
  ): Promise<Campaign> {
    const fullUplaodPathURl =
      process.env.BACKEND_URL + '/' + process.env.UPLAOD_PATH;
    try {
      let imageUrl = null;
      if (file?.originalname) {
        imageUrl = `${fullUplaodPathURl}/${file.originalname}`;
      }
      const newProduct = await this.stripe.products.create({
        name: createCampaignDto?.title,
        description: createCampaignDto?.description,
        active: true,
      });

      const campaingData: Partial<Campaign> = {
        ...createCampaignDto,
        imageUrl: imageUrl,
        stripeId: newProduct?.id,
        totalRaised: '0',
      };

      return await this.campaingRepository.save(campaingData);
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.CONFLICT);
    }
  }

  async findAll(): Promise<Campaign[]> {
    try {
      return await this.campaingRepository.find();
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.NOT_FOUND);
    }
  }

  async findOne(id: string): Promise<Campaign> {
    try {
      return await this.campaingRepository.findOne({
        where: {
          id: +id,
        },
      });
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.NOT_FOUND);
    }
  }

  async update(
    id: string,
    updateCampaignDto: UpdateCampaignDto,
  ): Promise<Campaign> {
    const { file, description, title, price } = updateCampaignDto;
    const fullUplaodPathURl =
      process.env.BACKEND_URL + '/' + process.env.UPLAOD_PATH;
    try {
      let imageUrl = null;
      if (file?.originalname) {
        imageUrl = `${fullUplaodPathURl}/${file.originalname}`;
      }
      let data: any;
      const campaign: Campaign = await this.findOne(id);
      if (file?.originalname) {
        campaign.imageUrl = imageUrl;
      }
      if (description) {
        campaign.description = description;
        data.description = description;
      }
      if (title) {
        campaign.title = title;
        data.title = title;
      }
      if (price) {
        campaign.price = price;
      }
      if (campaign?.stripeId) {
        await this.stripe.products.update(campaign?.stripeId, data);
      }
      campaign.updatedAt = new Date();
      return await this.campaingRepository.save(campaign);
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.CONFLICT);
    }
  }

  async remove(id: string): Promise<Campaign> {
    try {
      const campaign = await this.findOne(id);
      if (!campaign) {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }
      if (campaign?.stripeId) {
        await this.stripe.products.del(campaign?.stripeId);
      }
      return await this.campaingRepository.remove(campaign);
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.CONFLICT);
    }
  }
}
