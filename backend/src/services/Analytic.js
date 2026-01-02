import prisma from "../config/DBConnection.js"


export const AnalyticService = {
  // Count revenue from order table
  countRevenue: async () => {
    const revenue = await prisma.order.aggregate({
      _sum: {
        total_price: true
      }
    });
    return revenue._sum.total_price;
  },
}
