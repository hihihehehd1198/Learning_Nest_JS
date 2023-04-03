import { Category } from './../category/category.entity';
import { PrismaService } from './../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Product } from './product.entity';
import { ProductBodyDTO } from 'src/auth/dto/product/product.dto';
import { Prisma, ProductCategory } from '@prisma/client';
import { cloneDeep } from 'lodash'
import { Brand } from '../brands/brand.entity';
import { ERROR_RESPONSE } from 'src/shared/utils';



@Injectable()
export class ProductService {
    constructor(private prismaService: PrismaService) {
    }

    async getAll(id?: number) {
        let res = await this.prismaService.product.findMany({
            where: {
                id
            },
            select: {
                id: true,
                name: true,
                count: true,
                location: true,
                price: true,
                Brand: true,
                ProductCategory: {
                    select: {
                        category: true
                    }
                }
            },
        })
        if (res) {
            res = cloneDeep(res).map(x => {
                if (x['ProductCategory']) {
                    x['Category'] = x['ProductCategory'].map(x => {

                        return x['category'] as Category
                    }) || []
                    delete x['ProductCategory']
                }
                return x
            })
        }

        console.log(res)
        return res
    }

    async createCategory(data: ProductBodyDTO) {
        try {
            const { categoryId = [], brandId, ...rest } = data
            console.log('data', data)
            const addProductTask: ProductBodyDTO = await this.prismaService.product.create({
                data: {
                    ...rest,
                    brandId,
                },
            })
            // console.log('testing__________')
            const getNewId = (await addProductTask)?.id
            if (!getNewId) {
                throw new Error('cannot create product')
            }
            if (categoryId.length) {
                await this.prismaService.productCategory.createMany({
                    data: [...categoryId.map(x => {
                        return {
                            productId: getNewId,
                            categoryId: x,
                        }
                    })]
                    // data: [{
                    //     categoryId: categoryId[0],
                    //     productId: getNewId
                    // }]
                })
            }

            return addProductTask as ProductBodyDTO
        } catch (error) {
            ERROR_RESPONSE(error)
        }
    }


    async updateCategory(data: ProductBodyDTO) {
        try {
            const { categoryId = [], brandId, ...rest } = data
            console.log('data', data)

            //find category 
            if (categoryId.length && rest.id) {
                //delete all category product 
                await this.prismaService.productCategory.deleteMany({
                    where: {
                        productId: rest.id
                    }
                })
                await this.prismaService.productCategory.createMany({
                    data: [...categoryId.map(x => {
                        return {
                            productId: rest.id,
                            categoryId: x,
                        }
                    })]
                })
            }
            const res = await this.prismaService.product.update({
                where: {
                    id: rest.id
                },
                data: {
                    ...rest
                }
            })
            return res as Product
        } catch (error) {
            ERROR_RESPONSE(error)
        }

    }


    async deleteProduct(id?: number[]) {
        try {
            const findProduct = this.prismaService.product.findMany({
                where: {
                    id: {
                        in: [...id]
                    }
                }
            })
            if (!(await findProduct).length) {
                console.log(findProduct)
                throw new Error('cannot find product ')
            }
            const listQueryDelete = id.map(x => {
                return this.prismaService.productCategory.deleteMany({
                    where: {
                        productId: x
                    }
                })
            })


            const queryDeleteProduct = this.prismaService.product.deleteMany({
                where: {
                    id: {
                        in: [...id]
                    }
                }
            })
            await Promise.all([findProduct, ...listQueryDelete, queryDeleteProduct])
            return "ok!"
        } catch (error) {
            ERROR_RESPONSE(error)
        }
    }

}

