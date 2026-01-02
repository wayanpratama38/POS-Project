import prisma from "../config/DBConnection"


export default AnalyticService = {
  // Count revenue from order table
  countRevenue: async () => {
    const revenue = await prisma.order.aggregate({
      _sum: {
        total_price: true
      }
    });

    return revenue;

  },

}
