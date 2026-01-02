import AnalyticService from '../services/Analytic.js'

export default AnalyticController = {

  countRevenue: async (req, res, next) => {
    const revenue = await AnalyticService.countRevenue();

    return res.status(200).json({
      status: 'success',
      message: 'Berhasil mendapatkan seluruh revenue',
      data: revenue

    })
  }
}
