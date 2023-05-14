import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from "@nestjs/common";
import { OrderDTO, OrderProductDto } from './orderList.dto';
import { ERROR_RESPONSE } from 'src/shared/utils';
import { Order, ProductOrder } from './orderList.entity';
import { count } from 'console';




@Injectable()
export class OrderService {
    constructor(private prismaService: PrismaService) {

    }

    async createOrder(data: OrderDTO) {
        // const res = this.prismaService.listOrder.create({
        // })
        try {
            const { listProductId, customerId, ...rest } = data

            const findCustomer = await this.prismaService.customer.findFirst({
                where: {
                    id: {
                        in: customerId
                    }
                }
            })
            if (!findCustomer) {
                ERROR_RESPONSE('khong tim thay user !')
            }
            const addOrderTask = await this.prismaService.listOrder.create({
                data: {
                    ...rest,
                    customerId: customerId
                },
                select: {
                    id: true,
                    orderStatus: true,
                    paymentStatus: true,
                    customer: {
                        select: {
                            name: true
                        }
                    },
                    createdAt: true,
                    // OrderProduct: {
                    //     select: {
                    //         id: true,
                    //         product: {
                    //             select: {
                    //                 name: true
                    //             }
                    //         }
                    //     }
                    // }
                }
            })
            const getOrderId = (await addOrderTask)?.id
            if (!getOrderId) {
                ERROR_RESPONSE('khong tim thay order')
            }
            let listProductOrder;
            // if (listProductId && listProductId.length) {
            //     const productRes = await this.prismaService.orderProduct.createMany({
            //         data: [...listProductId.map(x => {
            //             return {
            //                 productId: x,
            //                 listOrderId: getOrderId
            //             }
            //         })],
            //     })
            //     console.log('productRes', productRes)
            //     listProductOrder = productRes
            // }
            if (listProductId && listProductId.length) {
                const productRes = await this.prismaService.$transaction([...listProductId].map((item: OrderProductDto) => this.prismaService.orderProduct.create({
                    data: {

                        productId: item.id,
                        listOrderId: getOrderId,
                        count: item.count,
                        price: item.price
                    },
                    select: {
                        product: {
                            select: {
                                name: true,
                                id: true,
                                count: true
                            }
                        }
                    }
                })))


                listProductOrder = [...productRes]?.map(x => x.product)!
                console.log('productRes', listProductOrder)
            }

            // let response;
            if (addOrderTask) {

                addOrderTask['customerName'] = addOrderTask['customer']['name']
                delete addOrderTask['customer']

                addOrderTask['productOrder'] = listProductOrder
            }
            console.log('response __________', addOrderTask)
            return addOrderTask
        } catch (error) {
            ERROR_RESPONSE(error)
        }
    }

    async updateOrder(data: OrderDTO) {
        try {
            const { id, listProductId, ...rest } = data
            const find = await this.prismaService.listOrder.findFirst({
                where: {
                    id
                }
            })
            if (!find) {
                ERROR_RESPONSE()
            }
            // const res = await this.prismaService.listOrder.update({
            //     where: {
            //         id
            //     },
            //     data: {
            //         ...rest
            //     }
            // })
            if (listProductId.length && find.id) {
                await this.prismaService.orderProduct.deleteMany({
                    where: {
                        listOrderId: find.id
                    }
                })
                await this.prismaService.orderProduct.createMany({
                    data: [...listProductId.map(x => {
                        return {
                            productId: x.id,
                            listOrderId: find.id,
                            count: x.count,
                            price: x.price,
                        }
                    })]
                })
            }
            const res = await this.prismaService.listOrder.update({
                where: {
                    id: find.id
                },
                data: {
                    ...rest
                }
            })


            // get customer id when update response success 
            const customerFind = await this.prismaService.customer.findFirst({
                where: {
                    ListOrder: {
                        some: {
                            id: id
                        }
                    }
                }
            })
            console.log("customerFind", customerFind)
            if (customerFind) {
                res['customerName'] = customerFind.name
            }
            return res
        } catch (error) {
            ERROR_RESPONSE(error)
        }
    }
    async deleteOrder(id: number[]) {

        try {
            await this.prismaService.listOrder.deleteMany({
                where: {
                    id: {
                        in: [...id]
                    }
                }
            })
            return 'ok'
        } catch (error) {
            ERROR_RESPONSE(error)
        }
    }

    async getOrder(id?: number) {
        try {
            const res = await this.prismaService.listOrder.findMany({
                where: {
                    id
                },
                select: {
                    id: true,
                    paymentStatus: true,
                    orderStatus: true,
                    customer: {
                        select: { name: true }
                    },
                    createdAt: true,

                    OrderProduct: {
                        select: {
                            id: true,
                            listOrderId: true,
                            count: true,
                            price: true,
                        }
                    }
                }
            })
            console.log('res____________', res)

            if (res) {
                res.map(x => {
                    x['customerName'] = x['customer'].name
                    delete x.customer
                    x['productOrder'] = x['OrderProduct']
                    delete x['OrderProduct']
                    return x
                })

            }
            return res
        } catch (error) {
            ERROR_RESPONSE(error)
        }
    }
}



// life cycle cua angular
//  ngOnchanges : khi component co su thay doi gia tri ve bien input/output , hoac khi output event duoc emit , thi chay , conf neu comp khong co 2 thang nay , hoac su dung nhung khong khai bao , thi cuxng khong chajy
//  onInit : chay 1 lan luc khoi tao comp
//  doCheck : chay khi comp thuc hien viec chajy cd
//  contentchecked : khi phan content duoc chajy cd
//  content init : khi phan content duoc init xong lan dau
//  content view / after view : giong voi content nhung doi tuuong can duoc tham chieu owr day la template
//  on destroy : khi compoennt duoc dong lai , dung de clear component / stream data => unsub cac thu 
